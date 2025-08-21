import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAnotherColumnToItem1755589590115 implements MigrationInterface {
    name = 'AddAnotherColumnToItem1755589590115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "anotherCollumn" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "anotherCollumn"`);
    }

}
