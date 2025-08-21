import 'reflect-metadata';
import AppDataSource from '../DB/data-source';
import { Item } from '../entities/item.entity';

async function run() {
  const ds = await AppDataSource.initialize();

  // get a repo (same as in your service)
  const itemsRepo = ds.getRepository(Item);

  await ds.query(`TRUNCATE TABLE "item" RESTART IDENTITY CASCADE`);

  // idempotent seed: only insert if table is empty
  const existing = await itemsRepo.count();
  if (existing > 0) {
    console.log(`Seed skipped: ${existing} items already exist`);
    await ds.destroy();
    return;
  }

  // sample rows
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
