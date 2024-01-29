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
import { UsersFetchingService, UsersService } from '../services';
import { UserSelectInterceptor } from '@utils/index';
import { Permissions } from '@decorators/permissions.decorator';

@Controller('users')
@UseInterceptors(UserSelectInterceptor())
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersFetchingService: UsersFetchingService,
  ) {}

  @Get('/')
  @Permissions('VIEW_ALL_USERS')
  async getUsers() {
    return this.usersFetchingService.getUsers();
  }

  @Get('/:id')
  @Permissions('VIEW_USER')
  async getUser(@Param() { id }: GetEntityDto) {
    const user = this.usersFetchingService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Delete('/:id')
  @Permissions('DELETE_USER')
  async deleteUser(@Param() { id }: GetEntityDto) {
    const user = await this.usersFetchingService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.usersService.deleteUser(user);
  }
}
