// Ref: https://stripe.com/docs/api/events/types
// Subscription Events
import { CustomerSubscriptionCreatedHandler } from './customer-subscription-created.handler';
import { CustomerSubscriptionDeletedHandler } from './customer-subscription-deleted.handler';
import { CustomerSubscriptionUpdatedHandler } from './customer-subscription-updated.handler';

export const StripeWebhookHandlers = [
  CustomerSubscriptionCreatedHandler,
  CustomerSubscriptionDeletedHandler,
  CustomerSubscriptionUpdatedHandler,
];
