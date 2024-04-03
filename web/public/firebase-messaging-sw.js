importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// apiKeyはプロジェクト識別をしているだけなので公開して良いらしい
firebase.initializeApp({
  apiKey: "AIzaSyDX00jV9oifCQ_QzaZL9pSSuR2oulGOdiU",
  authDomain: "pwa-sample-32b5e.firebaseapp.com",
  projectId: "pwa-sample-32b5e",
  storageBucket: "pwa-sample-32b5e.appspot.com",
  messagingSenderId: "892733228631",
  appId: "1:892733228631:web:64d56d4786c208094ec512",
});
const messaging = firebase.messaging();

// バックグラウンド時のメッセージ受信
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
