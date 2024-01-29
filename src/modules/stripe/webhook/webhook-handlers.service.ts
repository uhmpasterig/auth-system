import { Injectable } from '@nestjs/common';
import { StripeWebhookHandlers } from './handlers/index';
import { HandlerList, StripeEventTypes } from './webhook-handler.type';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class StripeWebhookHandlersService {
  private readonly handlers: HandlerList = new Map();
  constructor(private moduleRef: ModuleRef) {
    this.registerHandlers();
  }

  registerHandlers() {
    StripeWebhookHandlers.forEach((handler) => {
      const instance = this.moduleRef.get(handler, { strict: false });
      if (!instance) {
        return;
      }
      this.handlers.set(instance.event, instance.handle.bind(instance));
    });
  }

  getHandler(name: StripeEventTypes) {
    return this.handlers.get(name);
  }
}
