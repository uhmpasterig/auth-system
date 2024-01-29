import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeEventTypes, WebhookHandler } from '../webhook-handler.type';

@Injectable()
export class CustomerSubscriptionUpdatedHandler implements WebhookHandler {
  event: StripeEventTypes = 'customer.subscription.updated';
  
  async handle(event: Stripe.CustomerSubscriptionUpdatedEvent) {
    console.log('subscriptionUpdated');
  }
}
