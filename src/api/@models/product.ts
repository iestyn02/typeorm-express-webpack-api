import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne
} from "typeorm";
import { Company } from './company';

@Entity({ name: 'products', schema: 'demo' })

export class Product {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: "varchar",
    length: 127,
  })
  public name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  public desc: string;

  @Column({
    nullable: false,
    type: 'float'
  })
  public regular_price: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  public sale_price: number;

  @Column({
    nullable: false,
    type: 'integer'
  })
  @ManyToOne(_ => Company, company => company)
  @JoinColumn({ name: 'idCompany' })
  public company_id: number;

  @Column({
    type: "varchar",
    length: 256,
    nullable: true,
  })
  public image_url: string;
}
