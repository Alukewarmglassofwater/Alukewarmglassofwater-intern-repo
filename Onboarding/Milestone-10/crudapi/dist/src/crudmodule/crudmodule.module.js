"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudmoduleModule = void 0;
const common_1 = require("@nestjs/common");
const crudmodule_service_1 = require("./Non-DB functionality/crudmodule.service");
const crudmodule_controller_1 = require("./Non-DB functionality/crudmodule.controller");
const typeorm_1 = require("@nestjs/typeorm");
const item_entity_1 = require("./entities/item.entity");
const items_service_1 = require("./DB/items.service");
const crudmodule_ItemsController_1 = require("./DB/crudmodule.ItemsController");
const basiclogger_middleware_1 = require("../../middleware/basiclogger.middleware");
const crudmodule_ItemsController_2 = require("./DB/crudmodule.ItemsController");
let CrudmoduleModule = class CrudmoduleModule {
    configure(consumer) {
        consumer
            .apply(basiclogger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: 'RetItemController/:id', method: common_1.RequestMethod.GET });
    }
};
exports.CrudmoduleModule = CrudmoduleModule;
exports.CrudmoduleModule = CrudmoduleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([item_entity_1.Item])],
        controllers: [
            crudmodule_controller_1.CrudmoduleController,
            crudmodule_controller_1.RetNumber,
            crudmodule_controller_1.RetItemViaNum,
            crudmodule_ItemsController_1.ItemsController,
            crudmodule_ItemsController_2.TestItemController,
        ],
        providers: [crudmodule_service_1.CrudmoduleService, crudmodule_service_1.ATestService, crudmodule_service_1.returnInt, items_service_1.ItemsService],
    })
], CrudmoduleModule);
//# sourceMappingURL=crudmodule.module.js.map