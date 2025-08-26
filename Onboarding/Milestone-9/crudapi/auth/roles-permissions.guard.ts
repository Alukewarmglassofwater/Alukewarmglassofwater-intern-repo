// src/auth/roles-permissions.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  META_PERMS,
  META_ROLES,
  META_REQUIRE_ALL_PERMS,
  META_REQUIRE_ALL_ROLES,
} from './auth.decorators';

type JwtPayload = Record<string, any>;

@Injectable()
export class RolesPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const user: JwtPayload | undefined = req.user;

    // If no JWT/user present, your JwtAuthGuard should have rejected already.
    if (!user) throw new ForbiddenException('Missing authenticated user');

    // Read metadata from method → class (method takes precedence)
    const requiredRoles =
      this.reflector.get<string[]>(META_ROLES, ctx.getHandler()) ??
      this.reflector.get<string[]>(META_ROLES, ctx.getClass());

    const requiredPerms =
      this.reflector.get<string[]>(META_PERMS, ctx.getHandler()) ??
      this.reflector.get<string[]>(META_PERMS, ctx.getClass());

    const requireAllRoles =
      this.reflector.get<boolean>(META_REQUIRE_ALL_ROLES, ctx.getHandler()) ??
      this.reflector.get<boolean>(META_REQUIRE_ALL_ROLES, ctx.getClass()) ??
      false;

    const requireAllPerms =
      this.reflector.get<boolean>(META_REQUIRE_ALL_PERMS, ctx.getHandler()) ??
      this.reflector.get<boolean>(META_REQUIRE_ALL_PERMS, ctx.getClass()) ??
      false;

    // If no metadata is set, allow.
    if (
      (!requiredRoles || requiredRoles.length === 0) &&
      (!requiredPerms || requiredPerms.length === 0)
    ) {
      return true;
    }

    // Extract roles & permissions from token.
    // Works with Auth0:
    //  - permissions: in `permissions` array when RBAC toggle is ON.
    //  - roles: add via namespaced custom claim (e.g., https://yourapp/roles) in a Post-Login Action.
    const rolesNamespace =
      process.env.AUTH0_ROLES_CLAIM_NS || 'https://yourapp.example.com/roles';
    const permsNamespace = process.env.AUTH0_PERMS_CLAIM_NS || 'permissions';

    const userRoles: string[] =
      (user[rolesNamespace] as string[]) ||
      (user.authorization?.roles as string[]) || // sometimes available
      (user.roles as string[]) ||
      [];

    const userPerms: string[] =
      (user[permsNamespace] as string[]) ||
      (user.permissions as string[]) ||
      [];

    // Matching helpers
    const has = (set: string[], needed: string[], requireAll: boolean) => {
      const s = new Set((set || []).map((x) => x.toLowerCase()));
      if (!needed || needed.length === 0) return true;
      const normalized = needed.map((x) => x.toLowerCase());
      return requireAll
        ? normalized.every((n) => s.has(n))
        : normalized.some((n) => s.has(n));
    };

    const rolesOk = has(userRoles, requiredRoles ?? [], requireAllRoles);
    const permsOk = has(userPerms, requiredPerms ?? [], requireAllPerms);

    if (rolesOk && permsOk) return true;

    // Helpful error for debugging
    throw new ForbiddenException({
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
}
