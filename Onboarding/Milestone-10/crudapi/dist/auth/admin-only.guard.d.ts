import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AdminOnlyGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean;
}
