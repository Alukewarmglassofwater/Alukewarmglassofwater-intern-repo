import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateItemSchema1690000000000 implements MigrationInterface {
  public async up(q: QueryRunner): Promise<void> {
    await q.query('CREATE SCHEMA IF NOT EXISTS "item"');
  }
  public async down(q: QueryRunner): Promise<void> {
    await q.query('DROP SCHEMA IF EXISTS "item" CASCADE');
  }
}
