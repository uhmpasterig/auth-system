import { PrismaService } from '@modules/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShopsFetchingService {
  constructor(private prismaService: PrismaService) {}

  async getShopById(id: number) {
    return this.prismaService.handleOperation(this.prismaService.shop.findUnique({ where: { id } }));
  }

  async getShops() {
    return this.prismaService.handleOperation(this.prismaService.shop.findMany());
  }
}
