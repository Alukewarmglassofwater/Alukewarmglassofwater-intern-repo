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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtractTwoNumbersService = exports.Counter = exports.AddTwoNumbersService = exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
let AddTwoNumbersService = class AddTwoNumbersService {
    add(a, b) {
        return a + b;
    }
};
exports.AddTwoNumbersService = AddTwoNumbersService;
exports.AddTwoNumbersService = AddTwoNumbersService = __decorate([
    (0, common_1.Injectable)()
], AddTwoNumbersService);
let Counter = class Counter {
    _value;
    constructor(initial = 0) {
        this._value = initial;
    }
    get value() {
        return this._value;
    }
    increment(step = 1) {
        this._value += step;
        return this._value;
    }
    decrement(step = 1) {
        this._value -= step;
        return this._value;
    }
    reset() {
        this._value = 0;
    }
};
exports.Counter = Counter;
exports.Counter = Counter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], Counter);
let SubtractTwoNumbersService = class SubtractTwoNumbersService {
    sub(a, b) {
        return a - b;
    }
};
exports.SubtractTwoNumbersService = SubtractTwoNumbersService;
exports.SubtractTwoNumbersService = SubtractTwoNumbersService = __decorate([
    (0, common_1.Injectable)()
], SubtractTwoNumbersService);
//# sourceMappingURL=app.service.js.map