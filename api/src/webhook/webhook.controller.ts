import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  receiveWebhook(@Body() body: any) {
    console.log('Received webhook:', body);
  }
}
