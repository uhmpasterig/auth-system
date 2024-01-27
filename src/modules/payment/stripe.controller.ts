import { GetUser, Public } from '@/decorators';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import Stripe from 'stripe';
import { User } from 'types';
import { Response } from 'express';

@Controller('stripe')
@Public()
export class StripeController {
  constructor(@Inject('STRIPE_CLIENT') private readonly stripeClient: Stripe) {}

  @Post('/test')
  async testStripe(@Body() { id }: { id: number }) {
    const priceId = 'price_1Od0mZHcxZwiyx4Ehz8VA9TN';
    const session = await this.stripeClient.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      success_url: `http://localhost:3000/stripe/done?session_id={CHECKOUT_SESSION_ID}&user_id=${id}`,
      cancel_url: 'http://localhost:3000/stripe/canceled',
    });

    // return the session id and the url to redirect the user to
    return {
      id: session.id,
      url: session.url,
    };
  }

  @Get('/done')
  async stripeDone(@Query() query: any) {
    console.log(query);
    const session = await this.stripeClient.checkout.sessions.retrieve(
      query.session_id,
    );

    const user = await this.stripeClient.customers.retrieve(
      session.customer as string,
    );

    const subscription = await this.stripeClient.subscriptions.retrieve(
      session.subscription as string,
    );

    console.table({
      user,
      subscription,
    });
  }

  @Post('/webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = this.stripeClient.webhooks.constructEvent(
        req['rawBody'],
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    if (event.type === 'subscription_schedule.canceled') {
      const subscriptionSchedule = event.data
        .object as Stripe.SubscriptionSchedule;
      const customerId = subscriptionSchedule.customer as string;
      console.log(customerId);
    } else if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      // Look up the user in your database and remove their perks
      // This will depend on how you're associating Stripe customer IDs with your users
      // For example:
      // const user = await this.userService.findByStripeCustomerId(customerId);
      // user.removePerks();
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }

  @Get('/canceled')
  async stripeCancel() {
    console.log('GET');
  }
}
