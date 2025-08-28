"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.META_REQUIRE_ALL_PERMS = exports.META_REQUIRE_ALL_ROLES = exports.META_PERMS = exports.META_ROLES = void 0;
exports.Roles = Roles;
exports.Permissions = Permissions;
const common_1 = require("@nestjs/common");
exports.META_ROLES = 'authz:roles';
exports.META_PERMS = 'authz:perms';
exports.META_REQUIRE_ALL_ROLES = 'authz:reqAllRoles';
exports.META_REQUIRE_ALL_PERMS = 'authz:reqAllPerms';
function Roles(roles, options) {
    const value = Array.isArray(roles) ? roles : [roles];
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.META_ROLES, value), (0, common_1.SetMetadata)(exports.META_REQUIRE_ALL_ROLES, options?.requireAll ?? false));
}
function Permissions(perms, options) {
    const value = Array.isArray(perms) ? perms : [perms];
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.META_PERMS, value), (0, common_1.SetMetadata)(exports.META_REQUIRE_ALL_PERMS, options?.requireAll ?? false));
}
//# sourceMappingURL=auth.decorators.js.map