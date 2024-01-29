import { DynamicModule, Module, Provider } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeController } from './controllers/stripe.controller';
import { StripeService } from './services/stripe.service';
import { StripeWebhookService } from './services/stripe-webhook.service';
import { UsersFetchingService } from '@modules/user';
import { ShopsFetchingService } from '@modules/shop';

@Module({})
export class StripeModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripe = new Stripe(apiKey, config);
    const stripeProvider: Provider = {
      provide: 'STRIPE_CLIENT',
      useValue: stripe,
    };

    return {
      module: StripeModule,
      providers: [stripeProvider, StripeService, StripeWebhookService, UsersFetchingService, ShopsFetchingService],
      exports: [stripeProvider, StripeService, StripeWebhookService],
      controllers: [StripeController],
      global: true,
    };
  }
}
