import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Custom Modules
import { StripeModule, ShopModule, JwtModule, DatabaseModule, AuthModule, UserModule } from '@modules/index';

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
