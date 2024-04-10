import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { getJstISOString } from "../utils/time";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";

// apiKeyはプロジェクト識別をしているだけなので公開して良いらしい
const app = initializeApp({
  apiKey: "AIzaSyDX00jV9oifCQ_QzaZL9pSSuR2oulGOdiU",
  authDomain: "pwa-sample-32b5e.firebaseapp.com",
  projectId: "pwa-sample-32b5e",
  storageBucket: "pwa-sample-32b5e.appspot.com",
  messagingSenderId: "892733228631",
  appId: "1:892733228631:web:64d56d4786c208094ec512",
});

export async function requestNotificationPermission() {
  const messaging = getMessaging(app);

  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FCM_WEBPUSH_KEY as string,
    });

    if (token) {
      console.log(`Notification token: ${token}`);
      localStorage.setItem("push-token", token);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
}

export async function setPushNotificationInfo(
  user: ChannelService.User,
  token: string
) {
  const firestore = getFirestore(app);

  try {
    // Set token to Firestore
    const docRef = doc(firestore, "notification-channeltalk", user.id);
    await setDoc(docRef, {
      user: user,
      token: token,
      userAgent: window.navigator.userAgent,
      updated: getJstISOString(),
    });
  } catch (error) {
    console.error(
      "An error occured while adding push notification info to firestore.",
      error
    );
  }
}
