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
exports.SubtractTwoNumbersController = exports.AddTwoNumbersController = exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
let AddTwoNumbersController = class AddTwoNumbersController {
    AddTwoNumbersService;
    constructor(AddTwoNumbersService) {
        this.AddTwoNumbersService = AddTwoNumbersService;
    }
    AddTwoNumbers(a, b) {
        return this.AddTwoNumbersService.add(Number(a), Number(b));
    }
};
exports.AddTwoNumbersController = AddTwoNumbersController;
__decorate([
    (0, common_1.Get)('add'),
    __param(0, (0, common_1.Query)('a')),
    __param(1, (0, common_1.Query)('b')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Number)
], AddTwoNumbersController.prototype, "AddTwoNumbers", null);
exports.AddTwoNumbersController = AddTwoNumbersController = __decorate([
    (0, common_1.Controller)('math'),
    __metadata("design:paramtypes", [app_service_1.AddTwoNumbersService])
], AddTwoNumbersController);
let SubtractTwoNumbersController = class SubtractTwoNumbersController {
    SubtractTwoNumbersService;
    constructor(SubtractTwoNumbersService) {
        this.SubtractTwoNumbersService = SubtractTwoNumbersService;
    }
    SubtractTwoNumbers(a, b) {
        return this.SubtractTwoNumbersService.sub(Number(a), Number(b));
    }
};
exports.SubtractTwoNumbersController = SubtractTwoNumbersController;
__decorate([
    (0, common_1.Get)('subtract'),
    __param(0, (0, common_1.Query)('a')),
    __param(1, (0, common_1.Query)('b')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Number)
], SubtractTwoNumbersController.prototype, "SubtractTwoNumbers", null);
exports.SubtractTwoNumbersController = SubtractTwoNumbersController = __decorate([
    (0, common_1.Controller)('moreMath'),
    __metadata("design:paramtypes", [app_service_1.SubtractTwoNumbersService])
], SubtractTwoNumbersController);
//# sourceMappingURL=app.controller.js.map