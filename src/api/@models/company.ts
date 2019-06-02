import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";

import { Product } from './product';

@Entity({ name: 'companies', schema: 'demo' })

export class Company {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true
  })
  public avatar: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false
  })
  public name: string;

  @Column({
    type: "text",
    nullable: false
  })
  public email: string;

  @Column({
    type: "text",
    nullable: false
  })
  public website_url: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true
  })
  public phone: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true
  })
  public address: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true
  })
  public about: string;

  @Column({
    nullable: true
  })
  public registered: Date;

  @Column({
    nullable: true,
    type: 'float'
  })
  public latitude: number;

  @Column({
    nullable: true,
    type: 'float'
  })
  public longitude: number;

  @OneToMany(type => Product, product => product.id)
  product_ids: number[];
}
