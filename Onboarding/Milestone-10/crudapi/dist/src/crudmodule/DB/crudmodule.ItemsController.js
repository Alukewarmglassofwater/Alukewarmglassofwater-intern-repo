"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestItemController = exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("./items.service");
const create_crudmodule_dto_1 = require("../dto/create-crudmodule.dto");
const update_crudmodule_dto_1 = require("../dto/update-crudmodule.dto");
const item_entity_1 = require("../entities/item.entity");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const admin_only_guard_1 = require("../../../auth/admin-only.guard");
let ItemsController = class ItemsController {
    items;
    constructor(items) {
        this.items = items;
    }
    me(req) {
        return req.user;
    }
    findAll() {
        return this.items.findAll();
    }
    async findOne(id) {
        const item = await this.items.findOne(id);
        console.log('is Item instance?', item instanceof item_entity_1.Item);
        return this.items.findOne(id);
    }
    update(id, dto) {
        return this.items.update(id, dto);
    }
    remove(id) {
        return this.items.remove(id);
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Get)('auth/me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "me", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_only_guard_1.AdminOnlyGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_crudmodule_dto_1.UpdateCrudmoduleDto]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "remove", null);
exports.ItemsController = ItemsController = __decorate([
    (0, common_1.Controller)('items'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
let TestItemController = class TestItemController {
    items;
    constructor(items) {
        this.items = items;
    }
    async create(dto) {
        try {
            return await this.items.create(dto);
        }
        catch (e) {
            console.error('💥 POST /items failed:', e?.message || e);
            if (e?.stack)
                console.error(e.stack);
            throw e;
        }
    }
};
exports.TestItemController = TestItemController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_only_guard_1.AdminOnlyGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_crudmodule_dto_1.CreateCrudmoduleDto]),
    __metadata("design:returntype", Promise)
], TestItemController.prototype, "create", null);
exports.TestItemController = TestItemController = __decorate([
    (0, common_1.Controller)('testEncrypt'),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], TestItemController);
//# sourceMappingURL=crudmodule.ItemsController.js.map