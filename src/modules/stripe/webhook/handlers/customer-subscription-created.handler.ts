import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeEventTypes, WebhookHandler } from '../webhook-handler.type';

@Injectable()
export class CustomerSubscriptionCreatedHandler implements WebhookHandler {
  event: StripeEventTypes = 'customer.subscription.created';

  async handle(event: Stripe.CustomerSubscriptionCreatedEvent) {
    console.log('subscriptionCreated');
  }
}
