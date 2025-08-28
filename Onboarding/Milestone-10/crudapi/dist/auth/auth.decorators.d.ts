export declare const META_ROLES = "authz:roles";
export declare const META_PERMS = "authz:perms";
export declare const META_REQUIRE_ALL_ROLES = "authz:reqAllRoles";
export declare const META_REQUIRE_ALL_PERMS = "authz:reqAllPerms";
export declare function Roles(roles: string[] | string, options?: {
    requireAll?: boolean;
}): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function Permissions(perms: string[] | string, options?: {
    requireAll?: boolean;
}): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
