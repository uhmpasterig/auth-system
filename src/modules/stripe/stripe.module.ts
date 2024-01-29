import { DynamicModule, Module, Provider } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeController } from './controllers/stripe.controller';
import { StripeService } from './services';
import { UsersFetchingService } from '@modules/user';
import { ShopsFetchingService } from '@modules/shop';
import { StripeWebhookHandlersModule, StripeWebhookHandlersService, StripeWebhookService } from './webhook';

@Module({
  imports: [StripeWebhookHandlersModule],
  controllers: [StripeController],
  providers: [
    StripeService,
    StripeWebhookService,
    
    // Webhook
    StripeWebhookService,
    StripeWebhookHandlersService,

    // Fetching
    UsersFetchingService,
    ShopsFetchingService,
  ],
  exports: [StripeService, StripeWebhookService],
})
export class StripeModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripe = new Stripe(apiKey, config);
    const stripeProvider: Provider = {
      provide: 'STRIPE_CLIENT',
      useValue: stripe,
    };

    return {
      module: StripeModule,
      providers: [stripeProvider],
      exports: [stripeProvider],
    };
  }
}
