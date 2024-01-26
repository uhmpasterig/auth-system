import { Shop as PrismaShop } from '@prisma/client';

export type Shop = PrismaShop & {
  // Add custom fields here
};
