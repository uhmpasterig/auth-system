import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS } from '@prisma/client';
export const PERMISSIONS_KEY = 'sitePermissions';
export const Permissions = (...perms: PERMISSIONS[]) =>
  SetMetadata(PERMISSIONS_KEY, perms);
