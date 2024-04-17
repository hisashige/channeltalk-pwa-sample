import { Inject, Injectable } from '@nestjs/common';
import { app, messaging } from 'firebase-admin';
import { TokenMessage } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class WebhookService {
  constructor(@Inject('FIREBASE') private readonly firebaseAdmin: app.App) {}

  async pushNotification(data: any): Promise<void> {
    if (
      data?.entity?.personType !== 'manager' &&
      data?.entity?.personType !== 'bot'
    ) {
      return;
    }

    const userId = data?.refers?.user.id;
    if (!userId) {
      console.log('No user data in webhook body!');
      return;
    }

    const db = this.firebaseAdmin.firestore();
    const notificationDoc = await db
      .collection('notification-channeltalk')
      .doc(userId)
      .get();

    if (!notificationDoc.exists) {
      console.log('No such document!');
      return;
    }

    const notificationData = notificationDoc.data();
    const token = notificationData?.token;
    if (!token) {
      console.log('Token not found for user:', userId);
      return;
    }
    console.log('token:', token);

    // PUSH通知を送信
    const payload: TokenMessage = {
      token,
      notification: {
        title: '新着メッセージの受信',
        body: '新しいメッセージがあります。',
      },
    };

    try {
      await messaging().send(payload);
      console.log('PUSH通知が送信されました。');
    } catch (error) {
      console.error('PUSH通知の送信に失敗しました:', error);
    }
  }
}
