import Stripe from 'stripe';

export type StripeEventTypes = Stripe.WebhookEndpointCreateParams.EnabledEvent;

export type WebhookHandler = {
  handle: (event: Stripe.Event) => Promise<void>;
  event: StripeEventTypes;
};

export type HandlerList = Map<StripeEventTypes, (event: Stripe.Event) => Promise<void>>;
