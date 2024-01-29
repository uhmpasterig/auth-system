import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../../database';
import { UsersFetchingService } from '@modules/user';
import { ShopsFetchingService } from '@modules/shop';

@Injectable()
export class StripeService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private userFetchingService: UsersFetchingService,
    private shopFetchingService: ShopsFetchingService,
    @Inject('STRIPE_CLIENT') private readonly stripeClient: Stripe,
  ) {}

  async stripeCallbackURLBuilder(
    userId: number,
    shopId: number,
  ): Promise<{
    success_url: string;
    cancel_url: string;
  }> {
    const prefix = this.configService.get('API_URL');

    const success_url = `${prefix}/stripe/done?sessionId={CHECKOUT_SESSION_ID}&userId=${userId}&shopId=${shopId}`;
    const cancel_url = `${prefix}/stripe/canceled`;

    return { success_url, cancel_url };
  }

  async createPaymentSession(price: string, userId: number, shopId: number) {
    if (!userId || !shopId || !price) throw new BadRequestException('Missing parameters');

    const user = await this.userFetchingService.getUserById(userId);
    if (!user) throw new BadRequestException('User not found');

    const shop = await this.shopFetchingService.getShopById(shopId);
    if (!shop) throw new BadRequestException('Shop not found');

    const { success_url, cancel_url } = await this.stripeCallbackURLBuilder(userId, shopId);

    const session = await this.stripeClient.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      payment_method_types: ['card', 'paypal'],

      success_url,
      cancel_url,
    });

    await this.prismaService.handleOperation(
      this.prismaService.stripeSession.create({
        data: {
          stripe_session_id: session.id,
          user_id: Number(user.id),
          shop_id: Number(shop.id),
        },
      }),
    );

    return { url: session.url };
  }

  async stripeDone(sessionId: string, userId: number, shopId: number) {
    const session = await this.stripeClient.checkout.sessions.retrieve(sessionId);
    if (!session) return;

    if (session.payment_status !== 'paid') {
      throw new BadRequestException('You should only be here aftet the payment got completed');
    }

    const user = await this.stripeClient.customers.retrieve(session.customer as string);
    if (!user) return;
    const subscription = await this.stripeClient.subscriptions.retrieve(session.subscription as string);
    if (!subscription) return;

    const prismaSession = await this.prismaService.handleOperation(
      this.prismaService.stripeSession.findUnique({
        where: {
          stripe_session_id: sessionId,
        },
      }),
    );

    const prismaSubscription = await this.prismaService.handleOperation(
      this.prismaService.subscription.create({
        data: {
          user_id: prismaSession.user_id,
          shop_id: prismaSession.shop_id,

          stripe_price_id: subscription.items.data[0].price.id,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: user.id,
          stripe_subscription_status: subscription.status,
        },
      }),
    );
  }
}
