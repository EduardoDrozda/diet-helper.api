import * as dotenv from 'dotenv';
import { Knex, knex as setupKnex } from 'knex';
import { join } from 'path';

dotenv.config();

export const config: Knex.Config = {
  client: process.env.DB_CONNECTION,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: join(__dirname, 'migrations'),
  },
  seeds: {
    directory: join(__dirname, 'seeds'),
  },
};

export const knex = setupKnex(config);
