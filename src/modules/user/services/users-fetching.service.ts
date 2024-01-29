import { PrismaService } from '@/modules/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersFetchingService {
  constructor(private prismaService: PrismaService) {}

  async getUserById(id: number) {
    return this.prismaService.handleOperation(
      this.prismaService.user.findUnique({ where: { id } }),
    );
  }

  async getUserByEmail(email: string) {
    return this.prismaService.handleOperation(
      this.prismaService.user.findUnique({ where: { email } }),
    );
  }

  async getUserByName(name: string) {
    return this.prismaService.handleOperation(
      this.prismaService.user.findUnique({ where: { name } }),
    );
  }

  async getUserByEmailOrName({ email, name }: { email: string; name: string }) {
    return this.prismaService.handleOperation(
      this.prismaService.user.findFirst({
        where: {
          OR: [{ email }, { name }],
        },
      }),
    );
  }

  async getUsers() {
    return this.prismaService.handleOperation(
      this.prismaService.user.findMany(),
    );
  }
}
