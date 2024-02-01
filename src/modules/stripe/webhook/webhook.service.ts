import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeWebhookHandlersService } from './webhook-handlers.service';

@Injectable()
export class StripeWebhookService {
  constructor(
    private stripeWebhookHandlersService: StripeWebhookHandlersService,
  ) {}

  async processStripeWebhook(event: Stripe.Event) {
    try {
      const handler = this.stripeWebhookHandlersService.getHandler(event.type);
      if (!handler) return;
      await handler(event);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
