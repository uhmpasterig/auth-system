import { ShopFetchingService } from '../services/shops-fetching.service';
import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ShopService } from '../services';
import { GetUser, Public, ShopPermissions } from '@decorators/index';
import { User } from 'types';
import { CreateShopDto, GetEntityDto } from '@/dtos';
import Stripe from 'stripe';

@Controller('shops')
export class ShopsController {
  constructor(
    private readonly shopsService: ShopService,
    private readonly shopFetchingService: ShopFetchingService,
  ) {}

  @Post('/')
  async getAllShops() {
    return await this.shopFetchingService.getShops();
  }

  @Post('/create')
  async createShop(@GetUser() user: User, @Body() createShopDto: CreateShopDto) {
    return await this.shopsService.createShop(user, createShopDto);
  }

  @Get('/:id')
  @ShopPermissions('EDIT_SCRIPTS')
  async getShopById(@Param() { id }: GetEntityDto) {
    return await this.shopFetchingService.getShopById(id);
  }
}
