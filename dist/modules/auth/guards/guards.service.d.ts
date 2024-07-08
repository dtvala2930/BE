import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ServiceGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
