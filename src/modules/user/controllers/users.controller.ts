import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { GetEntityDto } from '@dtos/index';
import { UserFetchingService, UsersService } from '../services';
import { UserSelectInterceptor } from '@/utils';
import { Permissions } from '@/decorators/permissions.decorator';

@Controller('users')
@UseInterceptors(UserSelectInterceptor())
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userFetchingService: UserFetchingService,
  ) {}

  @Get('/')
  @Permissions('VIEW_ALL_USERS')
  async getUsers() {
    return this.userFetchingService.getUsers();
  }

  @Get('/:id')
  @Permissions('VIEW_USER')
  async getUser(@Param() { id }: GetEntityDto) {
    const user = this.userFetchingService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Delete('/:id')
  @Permissions('DELETE_USER')
  async deleteUser(@Param() { id }: GetEntityDto) {
    const user = await this.userFetchingService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.usersService.deleteUser(user);
  }
}
