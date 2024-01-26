import { CreateShopDto } from '@/dtos';
import { PrismaService } from '@/modules/database';
import { Injectable } from '@nestjs/common';
import { User } from 'types';

@Injectable()
export class ShopService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllShops() {
    return this.prismaService.handleOperation(
      this.prismaService.shop.findMany(),
    );
  }

  async getShopById(id: number) {
    return this.prismaService.handleOperation(
      this.prismaService.shop.findUnique({
        where: { id },
      }),
    );
  }

  async createShop(user: User, creationInfo: CreateShopDto) {
    return this.prismaService.handleOperation(
      this.prismaService.shop.create({
        data: {
          ...creationInfo,
          owner: {
            connect: {
              id: user.id,
            },
          },
        },
      }),
    );
  }
}
