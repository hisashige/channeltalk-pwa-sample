import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';

const firebaseProvider = {
  provide: 'FIREBASE',
  useFactory: () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const serviceAccount = require('../../serviceAccountKey.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    return admin;
  },
};

@Global()
@Module({
  providers: [firebaseProvider],
  exports: [firebaseProvider],
})
export class FirebaseModule {}
