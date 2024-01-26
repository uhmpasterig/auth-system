import {
  JwtModule as NestJwtModule,
  JwtService as NestJwtService,
} from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService, NestJwtService, ConfigService],
  exports: [JwtService],
})
export class JwtModule {}
