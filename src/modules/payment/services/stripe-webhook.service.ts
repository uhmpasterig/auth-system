import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../../database';

@Injectable()
export class StripeWebhookService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    @Inject('STRIPE_CLIENT') private readonly stripeClient: Stripe,
  ) {}

  async subscriptionEnded(event: Stripe.Event) {
    console.log('subscriptionEnded', JSON.stringify(event));
  }

  async subscriptionUpdated(event: Stripe.Event) {
    console.log('subscriptionUpdated', JSON.stringify(event));
  }

  async handleStripeWebhook(event: Stripe.Event) {
    
    switch (event.type) {
      case 'customer.subscription.deleted':
        return this.subscriptionEnded(event);
      case 'customer.subscription.updated':
        return this.subscriptionUpdated(event);
      default:
        return;
    }
  }
}
