import { Module } from '@nestjs/common';

// Custom Modules
import { JwtModule } from './modules/jwt';
import { DatabaseModule } from './modules/database';

import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';

import { ConfigModule } from '@nestjs/config';
import { ShopModule } from './modules/shop';
import { StripeModule } from './modules/payment/stripe.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ShopModule,
    JwtModule,
    DatabaseModule,
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
