import { Global, Module } from '@nestjs/common';
import { StripeWebhookHandlersService } from './webhook-handlers.service';
import { StripeWebhookHandlers } from './handlers/index';

@Global()
@Module({
  providers: StripeWebhookHandlers,
  exports: StripeWebhookHandlers,
})
export class StripeWebhookHandlersModule {}
