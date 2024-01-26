import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ShopService } from '../services';
import { GetUser, ShopPermissions } from '@decorators/index';
import { User } from 'types';
import { CreateShopDto, GetEntityDto } from '@/dtos';

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

  @Get('/:id')
  @ShopPermissions('EDIT_SCRIPTS')
  async getShopById(@Param() { id }: GetEntityDto) {
    return await this.shopsService.getShopById(id);
  }
}
