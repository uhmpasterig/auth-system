import { Body, Controller, Post } from '@nestjs/common';
import { ShopService } from '../services';
import { GetUser } from '@/decorators/user.decorator';
import { User } from 'types';
import { CreateShopDto } from '@/dtos';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopService) {}

  @Post('/create')
  async createShop(
    @GetUser() user: User,
    @Body() createShopDto: CreateShopDto,
  ) {
    return await this.shopsService.createShop(user, createShopDto);
  }

  @Post('/all')
  async getAllShops() {
    return await this.shopsService.getAllShops();
  }
}
