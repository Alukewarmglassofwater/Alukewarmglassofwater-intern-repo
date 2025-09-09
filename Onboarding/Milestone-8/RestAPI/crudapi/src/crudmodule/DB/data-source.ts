// src/crudmodule/DB/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Item } from '../entities/item.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'focusbear',
  password: 'focusbear',
  database: 'testDB',
  schema: 'public',
  entities: [Item], // or ['src/**/*.entity.ts']
  migrations: ['src/migrations/*.ts'],
  synchronize: true, // no sync
  logging: true,
});

export default AppDataSource;

/* node --require ts-node/register ./node_modules/typeorm/cli.js \
  -d src/crudmodule/DB/data-source.ts \
  migration:generate src/migrations/AddAnotherColumnToItem
*/

/*
node --require ts-node/register ./node_modules/typeorm/cli.js \
  -d src/crudmodule/DB/data-source.ts \
  migration:run
*/
