import { ConnectionOptions } from 'typeorm';

import { Company } from "@models/company";
import { Product } from "@models/product";

export const connectionOptions: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  entities: [
    Company,
    Product
  ]
}
