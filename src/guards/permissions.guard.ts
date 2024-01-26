import { PERMISSIONS_KEY } from '@decorators/permissions.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS } from '@prisma/client';
import { User } from 'types';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<PERMISSIONS[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }
    const { user }: { user: User } = context.switchToHttp().getRequest();
    if (!user || !user.permissions) {
      return false;
    }

    const hasPermission = requiredPermissions.every(
      (permission) => user.permissions?.includes(permission),
    );

    return hasPermission;
  }
}
