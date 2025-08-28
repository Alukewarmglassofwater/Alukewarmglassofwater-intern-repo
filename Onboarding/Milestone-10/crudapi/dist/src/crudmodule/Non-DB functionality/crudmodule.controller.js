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
exports.RetItemViaNum = exports.RetNumber = exports.CrudmoduleController = void 0;
const common_1 = require("@nestjs/common");
const create_crudmodule_dto_1 = require("../dto/create-crudmodule.dto");
const update_crudmodule_dto_1 = require("../dto/update-crudmodule.dto");
const crudmodule_service_1 = require("./crudmodule.service");
const create_a_test_dto_1 = require("../dto/create-a-test.dto");
const common_2 = require("@nestjs/common");
const crudmodule_service_2 = require("./crudmodule.service");
const crudmodule_service_3 = require("./crudmodule.service");
let CrudmoduleController = class CrudmoduleController {
    crudmoduleService;
    constructor(crudmoduleService) {
        this.crudmoduleService = crudmoduleService;
    }
    create(createCrudmoduleDto) {
        return this.crudmoduleService.create(createCrudmoduleDto);
    }
    findAll() {
        return this.crudmoduleService.findAll();
    }
    findOne(id) {
        return this.crudmoduleService.findOne(+id);
    }
    update(id, updateCrudmoduleDto) {
        return this.crudmoduleService.update(+id, updateCrudmoduleDto);
    }
    remove(id) {
        return this.crudmoduleService.remove(+id);
    }
};
exports.CrudmoduleController = CrudmoduleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_crudmodule_dto_1.CreateCrudmoduleDto]),
    __metadata("design:returntype", void 0)
], CrudmoduleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CrudmoduleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrudmoduleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_crudmodule_dto_1.UpdateCrudmoduleDto]),
    __metadata("design:returntype", void 0)
], CrudmoduleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrudmoduleController.prototype, "remove", null);
exports.CrudmoduleController = CrudmoduleController = __decorate([
    (0, common_1.Controller)('crudmodule'),
    __metadata("design:paramtypes", [crudmodule_service_2.CrudmoduleService])
], CrudmoduleController);
let RetNumber = class RetNumber {
    aTestService;
    constructor(aTestService) {
        this.aTestService = aTestService;
    }
    test(dto) {
        return this.aTestService.create(dto);
    }
};
exports.RetNumber = RetNumber;
__decorate([
    (0, common_1.Post)('retNumberRoute'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_a_test_dto_1.TestDto]),
    __metadata("design:returntype", void 0)
], RetNumber.prototype, "test", null);
exports.RetNumber = RetNumber = __decorate([
    (0, common_1.Controller)('RetNumberController'),
    __metadata("design:paramtypes", [crudmodule_service_1.ATestService])
], RetNumber);
let RetItemViaNum = class RetItemViaNum {
    returnInt;
    constructor(returnInt) {
        this.returnInt = returnInt;
    }
    findOne(id) {
        return this.returnInt.getItemviaNum(id);
    }
};
exports.RetItemViaNum = RetItemViaNum;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RetItemViaNum.prototype, "findOne", null);
exports.RetItemViaNum = RetItemViaNum = __decorate([
    (0, common_1.Controller)('RetItemController'),
    __metadata("design:paramtypes", [crudmodule_service_3.returnInt])
], RetItemViaNum);
//# sourceMappingURL=crudmodule.controller.js.map