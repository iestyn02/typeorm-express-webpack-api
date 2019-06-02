import { name, version } from '../../../package.json';

if (!process.env) {
  throw new Error(`No .env found, generate one using .env.example`);
}

let CONFIG_VARS = {
  APP_NAME: name,
  APP_VERSION: version,
  HOST: '127.0.0.1',
  PORT: Number(process.env.PORT) || 3000,
  ENV: process.env.NODE_ENV,
  LOGS: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  DB: {
    DB_CONN: 'default',
    DB_HOST: process.env.POSTGRES_HOST,
    DB_PORT: Number(process.env.POSTGRES_PORT),
    DB_NAME: process.env.POSTGRES_DB,
    DB_USER: process.env.POSTGRES_USER,
    DB_PASS: process.env.POSTGRES_PASS,
    SSL: process.env.POSTGRES_SSL || true,
    DB_MIN: Number(process.env.POSTGRES_MIN_POOL) || 2,
    DB_MAX: Number(process.env.POSTGRES_MAX_POOL) || 10
  }
};

export default CONFIG_VARS;

export const { APP_NAME, APP_VERSION, HOST, PORT, ENV, DB, LOGS } = CONFIG_VARS;
export const { DB_NAME, DB_USER, DB_CONN, DB_PASS, DB_HOST, DB_PORT } = CONFIG_VARS.DB;
