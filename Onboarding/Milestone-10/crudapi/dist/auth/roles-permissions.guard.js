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
exports.RolesPermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_decorators_1 = require("./auth.decorators");
let RolesPermissionsGuard = class RolesPermissionsGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(ctx) {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;
        if (!user)
            throw new common_1.ForbiddenException('Missing authenticated user');
        const requiredRoles = this.reflector.get(auth_decorators_1.META_ROLES, ctx.getHandler()) ??
            this.reflector.get(auth_decorators_1.META_ROLES, ctx.getClass());
        const requiredPerms = this.reflector.get(auth_decorators_1.META_PERMS, ctx.getHandler()) ??
            this.reflector.get(auth_decorators_1.META_PERMS, ctx.getClass());
        const requireAllRoles = this.reflector.get(auth_decorators_1.META_REQUIRE_ALL_ROLES, ctx.getHandler()) ??
            this.reflector.get(auth_decorators_1.META_REQUIRE_ALL_ROLES, ctx.getClass()) ??
            false;
        const requireAllPerms = this.reflector.get(auth_decorators_1.META_REQUIRE_ALL_PERMS, ctx.getHandler()) ??
            this.reflector.get(auth_decorators_1.META_REQUIRE_ALL_PERMS, ctx.getClass()) ??
            false;
        if ((!requiredRoles || requiredRoles.length === 0) &&
            (!requiredPerms || requiredPerms.length === 0)) {
            return true;
        }
        const rolesNamespace = process.env.AUTH0_ROLES_CLAIM_NS || 'https://yourapp.example.com/roles';
        const permsNamespace = process.env.AUTH0_PERMS_CLAIM_NS || 'permissions';
        const userRoles = user[rolesNamespace] ||
            user.authorization?.roles ||
            user.roles ||
            [];
        const userPerms = user[permsNamespace] ||
            user.permissions ||
            [];
        const has = (set, needed, requireAll) => {
            const s = new Set((set || []).map((x) => x.toLowerCase()));
            if (!needed || needed.length === 0)
                return true;
            const normalized = needed.map((x) => x.toLowerCase());
            return requireAll
                ? normalized.every((n) => s.has(n))
                : normalized.some((n) => s.has(n));
        };
        const rolesOk = has(userRoles, requiredRoles ?? [], requireAllRoles);
        const permsOk = has(userPerms, requiredPerms ?? [], requireAllPerms);
        if (rolesOk && permsOk)
            return true;
        throw new common_1.ForbiddenException({
            message: 'Insufficient privileges',
            required: {
                roles: requiredRoles,
                requireAllRoles,
                permissions: requiredPerms,
                requireAllPerms,
            },
            granted: {
                roles: userRoles,
                permissions: userPerms,
            },
        });
    }
};
exports.RolesPermissionsGuard = RolesPermissionsGuard;
exports.RolesPermissionsGuard = RolesPermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesPermissionsGuard);
//# sourceMappingURL=roles-permissions.guard.js.map