import { Module } from '@nestjs/common';
import { ShopsController } from './controllers';
import { ShopService } from './services';
import { APP_GUARD } from '@nestjs/core';
import { ShopPermissionsGuard } from '@/guards';

@Module({
  controllers: [ShopsController],
  providers: [
    ShopService,
    {
      provide: APP_GUARD,
      useClass: ShopPermissionsGuard,
    },
  ],
  exports: [ShopService],
})
export class ShopModule {}
