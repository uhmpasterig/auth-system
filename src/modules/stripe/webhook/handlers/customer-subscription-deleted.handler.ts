import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeEventTypes, WebhookHandler } from '../webhook-handler.type';

@Injectable()
export class CustomerSubscriptionDeletedHandler implements WebhookHandler {
  event: StripeEventTypes = 'customer.subscription.deleted';

  async handle(event: Stripe.CustomerSubscriptionDeletedEvent) {
    console.log('subscriptionDeleted');
  }
}
