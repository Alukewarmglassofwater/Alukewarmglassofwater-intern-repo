// src/auth/authz.decorators.ts
import { SetMetadata, applyDecorators } from '@nestjs/common';

export const META_ROLES = 'authz:roles';
export const META_PERMS = 'authz:perms';
export const META_REQUIRE_ALL_ROLES = 'authz:reqAllRoles';
export const META_REQUIRE_ALL_PERMS = 'authz:reqAllPerms';

export function Roles(
  roles: string[] | string,
  options?: { requireAll?: boolean },
) {
  const value = Array.isArray(roles) ? roles : [roles];
  return applyDecorators(
    SetMetadata(META_ROLES, value),
    SetMetadata(META_REQUIRE_ALL_ROLES, options?.requireAll ?? false),
  );
}

export function Permissions(
  perms: string[] | string,
  options?: { requireAll?: boolean },
) {
  const value = Array.isArray(perms) ? perms : [perms];
  return applyDecorators(
    SetMetadata(META_PERMS, value),
    SetMetadata(META_REQUIRE_ALL_PERMS, options?.requireAll ?? false),
  );
}
