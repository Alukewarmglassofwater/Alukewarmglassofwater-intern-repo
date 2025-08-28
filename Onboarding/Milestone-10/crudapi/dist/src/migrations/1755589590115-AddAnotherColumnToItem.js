"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAnotherColumnToItem1755589590115 = void 0;
class AddAnotherColumnToItem1755589590115 {
    name = 'AddAnotherColumnToItem1755589590115';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "item" ADD "anotherCollumn" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "anotherCollumn"`);
    }
}
exports.AddAnotherColumnToItem1755589590115 = AddAnotherColumnToItem1755589590115;
//# sourceMappingURL=1755589590115-AddAnotherColumnToItem.js.map