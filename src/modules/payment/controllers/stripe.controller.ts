import { GetUser, Public } from '@/decorators';
import { Body, Controller, Get, Inject, Post, Query, Req, Res, UseInterceptors } from '@nestjs/common';
import Stripe from 'stripe';
import { User } from 'types';
import { StripeService } from '../services/stripe.service';
import { StripeWebhookService } from '../services/stripe-webhook.service';
import { StripeCreateSessionDto, StripePaymentDoneDto } from '@/dtos';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
    private readonly stripeWebhookService: StripeWebhookService,
    @Inject('STRIPE_CLIENT') private readonly stripeClient: Stripe,
  ) {}

  @Get('/create-session')
  async testStripe(@Query() { priceId, userId, shopId }: StripeCreateSessionDto) {
    return this.stripeService.createPaymentSession(priceId, userId, shopId);
  }

  @Get('/done')
  @Public()
  async stripeDone(@Query() { sessionId, userId, shopId }: StripePaymentDoneDto) {
    return this.stripeService.stripeDone(sessionId, userId, shopId);
  }

  @Post('/webhook')
  @Public()
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    let event: Stripe.Event;
    try {
      event = this.stripeClient.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        this.configService.get('STRIPE_WEBHOOK_SECRET'),
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    await this.stripeWebhookService.handleStripeWebhook(event);

    res.json({ received: true });
  }
}
