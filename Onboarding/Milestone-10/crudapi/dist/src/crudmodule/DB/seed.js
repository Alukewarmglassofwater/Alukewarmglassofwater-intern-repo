"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = __importDefault(require("../DB/data-source"));
const item_entity_1 = require("../entities/item.entity");
async function run() {
    const ds = await data_source_1.default.initialize();
    const itemsRepo = ds.getRepository(item_entity_1.Item);
    await ds.query(`TRUNCATE TABLE "item" RESTART IDENTITY CASCADE`);
    const existing = await itemsRepo.count();
    if (existing > 0) {
        console.log(`Seed skipped: ${existing} items already exist`);
        await ds.destroy();
        return;
    }
    const rows = [
        { name: 'Alpha', description: 'first', quantity: 2 },
        { name: 'Bravo', description: 'second', quantity: 5 },
        { name: 'Charlie', description: 'second', quantity: 8 },
        { name: 'Hi', description: 'second', quantity: 8 },
        { name: 'Jackson', description: 'second', quantity: 8 },
        { name: 'Your', description: 'second', quantity: 8 },
        { name: 'Seed', description: 'second', quantity: 8 },
        { name: 'Is', description: 'second', quantity: 8 },
        { name: 'Working', description: 'second', quantity: 8 },
        { name: 'Badabing', description: 'second', quantity: 8 },
        { name: 'Badaboom', description: 'second', quantity: 8 },
    ];
    await itemsRepo.save(rows);
    console.log('Seed complete ✅');
    await ds.destroy();
}
run().catch(async (err) => {
    console.error('Seed failed ❌', err);
    process.exitCode = 1;
});
//# sourceMappingURL=seed.js.map