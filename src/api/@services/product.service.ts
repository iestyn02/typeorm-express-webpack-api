import { getManager, Repository } from "typeorm";
import { NotFound, BadRequest } from "http-errors";

import { DB_CONN } from '@vars';
import { Product } from "@models/product";

export class ProductService {

  private static _entityManager: Repository<Product>;

  constructor() {
    throw Error("Cannot be intantiated");
  }

  /**
   * Return Repository Manager for Product Entity
   */
  private static db(): Repository<Product> {
    return this._entityManager || (this._entityManager = getManager(DB_CONN).getRepository(Product));
  }

  /**
   * Validate submitted fields
   * @param fields
   */
  private static validate(fields: Partial<Product>): boolean {
    if (!fields.name) throw new BadRequest("Product requires `name`");
    return true;
  }

  /**
   * Get all Products
   */
  public static async getAll(): Promise<Product[]> {
    return await this.db().find();
  }

  /**
   * Get Product by Website ID
   */
  public static async findByCompany(id: Number): Promise<Product[]> {
    return await this.db().find({
      where: {
        company_id: id,
      },
    })
  };

  /**
   * Add a new Product
   * @param fields
   */
  public static async add(fields: Partial<Product>): Promise<Product> {
    if (!fields.name) throw new NotFound();
    let item = new Product();
    item.name = fields.name;
    item.regular_price = fields.regular_price;
    item.company_id = fields.company_id;
    return await this.db().save(item);
  }

  /**
   * Get a Product by id
   * @param id
   */
  public static async getById(id: number): Promise<Product> {
    let item = await this.db().findOne(id);
    if (!item) throw new NotFound();
    return item;
  }

  /**
   * Update a Products by id
   * @param id
   * @param fields
   */
  public static async updateById(id: number, fields: Partial<Product>): Promise<Product> {
    this.validate(fields);
    let item = await this.getById(id);
    item.name = fields.name;
    item.company_id = fields.company_id;
    return await this.db().save(item);
  }

  /**
   * Delete a Product by id
   * @param id
   */
  public static async deleteById(id: number): Promise<number> {
    let item = await this.getById(id);
    await this.db().remove(item);
    return id;
  }

  /**
   * Delete all Products
   */
  public static async deleteAll(): Promise<boolean> {
    let items = await this.getAll();
    await this.db().remove(items);
    return true;
  }
}
