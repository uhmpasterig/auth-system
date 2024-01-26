import { Module } from '@nestjs/common';
import { ShopsController } from './controllers';
import { ShopService } from './services';

@Module({
  controllers: [ShopsController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
