import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddAnotherColumnToItem1755589590115 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
