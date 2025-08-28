"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnInt = exports.ATestService = exports.CrudmoduleService = void 0;
const common_1 = require("@nestjs/common");
let CrudmoduleService = class CrudmoduleService {
    create(createCrudmoduleDto) {
        return 'This action adds a new crudmodule';
    }
    findAll() {
        return `This action returns all crudmodule`;
    }
    findOne(id) {
        return `This action returns a #${id} crudmodule`;
    }
    update(id, updateCrudmoduleDto) {
        return `This action updates a #${id} crudmodule`;
    }
    remove(id) {
        return `This action removes a #${id} crudmodule`;
    }
};
exports.CrudmoduleService = CrudmoduleService;
exports.CrudmoduleService = CrudmoduleService = __decorate([
    (0, common_1.Injectable)()
], CrudmoduleService);
let ATestService = class ATestService {
    create(dto) {
        return { message: `You sent the number ${dto.value}\n` };
    }
};
exports.ATestService = ATestService;
exports.ATestService = ATestService = __decorate([
    (0, common_1.Injectable)()
], ATestService);
let returnInt = class returnInt {
    items = [
        { id: 1, name: 'Test item 1' },
        { id: 2, name: 'Test item 2' },
    ];
    getItemviaNum(id) {
        const item = this.items.find((i) => i.id === id);
        if (!item) {
            throw new common_1.NotFoundException(`Item with id ${id} not present in database`);
        }
        return item;
    }
};
exports.returnInt = returnInt;
exports.returnInt = returnInt = __decorate([
    (0, common_1.Injectable)()
], returnInt);
//# sourceMappingURL=crudmodule.service.js.map