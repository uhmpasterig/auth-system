import { Module } from '@nestjs/common';
import { MeController, UsersController } from './controllers';
import { UserFetchingService, UsersService } from './services';

@Module({
  controllers: [MeController, UsersController],
  providers: [UsersService, UserFetchingService],
  exports: [UsersService],
})
export class UserModule {}
