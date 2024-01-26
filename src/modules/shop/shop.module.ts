import { Module } from '@nestjs/common';
import { ShopsController } from './controllers';
import { ShopsService } from './services';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopModule {}
