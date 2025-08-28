"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const item_entity_1 = require("../entities/item.entity");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'focusbear',
    password: 'focusbear',
    database: 'testDB',
    entities: [item_entity_1.Item],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
});
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map