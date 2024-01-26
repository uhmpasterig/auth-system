import { PrismaService } from '@/modules/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser(user: { id: number }) {
    return this.prismaService.user.delete({
      where: { id: user.id },
    });
  }
}
