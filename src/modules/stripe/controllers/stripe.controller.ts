import { Public } from '@decorators/index';
import { Controller, Get, Inject, Post, Query, Req, Res } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from '../services/stripe.service';
import { StripeCreateSessionDto, StripePaymentDoneDto } from '@dtos/index';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { StripeWebhookService } from '../webhook/webhook.service';

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

    this.stripeWebhookService.processStripeWebhook(event);

    res.json({ received: true });
  }
}
