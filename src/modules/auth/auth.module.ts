import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@modules/jwt';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { UserFetchingService } from '@/modules/user/services/users-fetching.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, PermissionsGuard } from '@guards/index';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    NestJwtService,
    UserFetchingService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  imports: [JwtModule],
})
export class AuthModule {}
