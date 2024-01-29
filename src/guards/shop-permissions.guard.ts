import { PrismaService } from '@modules/database';
import { SHOP_PERMISSIONS_KEY } from '@decorators/shop-permissions.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS } from '@prisma/client';
import { User } from 'types';

@Injectable()
export class ShopPermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<PERMISSIONS[]>(SHOP_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user) {
      return false;
    }
    const shopId = Number(request.params.id || request.body.shopId || request.query.id);
    if (!shopId) {
      return false;
    }

    const shop = await this.prismaService.handleOperation(
      this.prismaService.shop.findUnique({
        where: {
          id: shopId,
        },
      }),
    );

    if (shop && shop.owner_id === user.id) {
      return true;
    }

    const userShopPermissions = await this.prismaService.handleOperation(
      this.prismaService.userShopPermission.findFirst({
        where: {
          user_id: user.id,
          shop_id: shopId,
        },
      }),
    );
    if (!userShopPermissions || !userShopPermissions.permissions) {
      return false;
    }

    const hasPermission = requiredPermissions.every((permission) => userShopPermissions.permissions?.includes(permission));

    return hasPermission;
  }
}
