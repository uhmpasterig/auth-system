import { Controller, Get } from '@nestjs/common';
import { GetUser } from '@decorators/user.decorator';
import type { User } from 'types';
import { UseInterceptors } from '@nestjs/common';
import { UserSelectInterceptor } from '@utils/interceptors';

@Controller('me')
@UseInterceptors(UserSelectInterceptor())
export class MeController {
  @Get('/')
  async getOwnUser(@GetUser() user: User) {
    return user;
  }
}
