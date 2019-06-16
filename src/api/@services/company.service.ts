import { getManager, Repository } from 'typeorm';
import { NotFound, BadRequest } from 'http-errors';

import { DB_CONN } from '@vars';
import { Company } from '@models';

export class CompanyService {

  private static _entityManager: Repository<Company>;

  constructor() {
    throw Error('Cannot be intantiated');
  }

  /**
   * Return Repository Manager for Company Entity
   */
  private static db(): Repository<Company> {
    return this._entityManager || (this._entityManager = getManager(DB_CONN).getRepository(Company));
  }

  /**
   * Validate submitted fields
   * @param fields
   */
  private static validate(fields: Partial<Company>): boolean {
    if (!fields.name) throw new BadRequest('`name` is required');
    return true;
  }

  /**
   * Get all Companies
   */
  public static async getAll(): Promise<Company[]> {
    return await this.db().find();
  }

  /**
   * Add a new Company
   * @param fields
   */
  public static async add(fields: Partial<Company>): Promise<Company> {
    this.validate(fields);
    let item = new Company();
    item.name = fields.name;
    item.avatar = fields.avatar;
    item.website_url = fields.website_url;
    item.email = fields.email;
    item.phone = fields.phone;
    item.address = fields.address;
    item.about = fields.about;
    item.registered = fields.registered;
    item.latitude = fields.latitude;
    item.longitude = fields.longitude;
    return this.db().save(item);
  }

  /**
   * Get a Company by id
   * @param id
   */
  public static async getById(id: number): Promise<Company> {
    let item = await this.db().findOne(id);
    if (!item) throw new NotFound();
    return item;
  }

  /**
   * Update a Company by id
   * @param id
   * @param fields
   */
  public static async updateById(id: number, fields: Partial<Company>): Promise<Company> {
    this.validate(fields);
    let item = await this.getById(id);
    item.name = fields.name;
    return await this.db().save(item);
  }

  /**
   * Delete a Company by id
   * @param id
   */
  public static async deleteById(id: number): Promise<number> {
    let item = await this.getById(id);
    await this.db().remove(item);
    return id;
  }

  /**
   * Delete all Companies
   */
  public static async deleteAll(): Promise<boolean> {
    let items = await this.getAll();
    await this.db().remove(items);
    return true;
  }
}
