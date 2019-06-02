import { ConnectionOptions } from 'typeorm';

import { Company } from "./src/api/@models/company";
import { Product } from "./src/api/@models/product";

const config: ConnectionOptions = {
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
  ],
  migrations: [
    "./src/db/migrations/*.ts"
  ],
  cli: {
    migrationsDir: './src/db/migrations',
  },
  synchronize: true,
  logging: false
};

export = config;
