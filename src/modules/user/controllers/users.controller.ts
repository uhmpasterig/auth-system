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

import { GetUserDto } from '@dtos/index';
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
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUser(@Param() { id }: GetUserDto) {
    const user = this.userFetchingService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Delete('/:id')
  @Permissions('DELETE_USER')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteUser(@Param() { id }: GetUserDto) {
    const user = await this.userFetchingService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.usersService.deleteUser(user);
  }
}
