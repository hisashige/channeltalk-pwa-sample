import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [FirebaseModule, WebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
