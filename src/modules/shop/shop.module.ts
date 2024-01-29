import { Module } from '@nestjs/common';
import { ShopsController } from './controllers';
import { ShopsService, ShopsFetchingService } from './services';
import { APP_GUARD } from '@nestjs/core';
import { ShopPermissionsGuard } from '@guards/index';

@Module({
  controllers: [ShopsController],
  providers: [
    ShopsService,
    ShopsFetchingService,
    {
      provide: APP_GUARD,
      useClass: ShopPermissionsGuard,
    },
  ],
  exports: [ShopsService],
})
export class ShopModule {}
