import { Module } from '@nestjs/common';
import { MeController, UsersController } from './controllers';
import { UsersFetchingService, UsersService } from './services';

@Module({
  controllers: [MeController, UsersController],
  providers: [UsersService, UsersFetchingService],
  exports: [UsersService],
})
export class UserModule {}
