"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCrudmoduleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_crudmodule_dto_1 = require("./create-crudmodule.dto");
class UpdateCrudmoduleDto extends (0, mapped_types_1.PartialType)(create_crudmodule_dto_1.CreateCrudmoduleDto) {
}
exports.UpdateCrudmoduleDto = UpdateCrudmoduleDto;
//# sourceMappingURL=update-crudmodule.dto.js.map