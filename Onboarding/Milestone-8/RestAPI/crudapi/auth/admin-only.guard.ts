/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/auth/admin-only.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminOnlyGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user; // <- set by your JWT auth guard/strategy
    const rolesNs =
      process.env.AUTH0_ROLES_CLAIM_NS || 'https://yourapp.example.com/roles';

    const roles: string[] =
      user?.[rolesNs] || user?.authorization?.roles || user?.roles || [];

    if (
      Array.isArray(roles) &&
      roles.map((r) => r.toLowerCase()).includes('admin')
    ) {
      return true;
    }
    throw new ForbiddenException('Admins only');
  }
}
