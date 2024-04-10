import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async receiveWebhook(@Body() body: any) {
    console.log('Received webhook:', body);
    await this.webhookService.pushNotification(body);
  }
}
