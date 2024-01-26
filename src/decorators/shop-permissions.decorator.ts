import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS } from '@prisma/client';
export const SHOP_PERMISSIONS_KEY = 'shopPermissions';
export const ShopPermissions = (...perms: PERMISSIONS[]) =>
  SetMetadata(SHOP_PERMISSIONS_KEY, perms);
