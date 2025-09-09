import { MigrationInterface, QueryRunner } from 'typeorm';

export class RebuildItem1710000000000 implements MigrationInterface {
  name = 'RebuildItem1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "item" (
        "id" SERIAL PRIMARY KEY,
        "name" varchar(200) NOT NULL,
        "description" text,
        "quantity" integer NOT NULL DEFAULT 0,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        "anotherColumn" text
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "item"`);
  }
}
