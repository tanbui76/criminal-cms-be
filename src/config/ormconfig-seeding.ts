import { ConnectionOptions } from 'typeorm';

import config from 'config';
const dbConfig = config.get('db');

export default {
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  seeds: [__dirname + '/../database/seeds/**/*{.ts,.js}'],
  factories: [__dirname + '/../database/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
    seedsDir: 'src/database/seeds',
    factoriesDir: 'src/database/factories'
  }
} as ConnectionOptions;
