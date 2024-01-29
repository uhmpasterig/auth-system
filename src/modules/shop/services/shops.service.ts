import { CreateShopDto } from '@dtos/index';
import { PrismaService } from '@modules/database';
import { Injectable } from '@nestjs/common';
import { User } from 'types';

@Injectable()
export class ShopsService {
  constructor(private readonly prismaService: PrismaService) {}

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
