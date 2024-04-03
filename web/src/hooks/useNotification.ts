import { useCallback, useEffect, useState } from "react";
import { requestNotificationPermission } from "../lib/firebase";
import { getMessaging, onMessage } from "firebase/messaging";

export function useNotification() {
  const [permission, setPermission] = useState<
    NotificationPermission | "not-supported"
  >("default");

  const revalidate = useCallback(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    } else {
      setPermission("not-supported");
    }
  }, []);

  useEffect(() => {
    revalidate();
  }, [revalidate]);

  const [isRequesting, setIsRequesting] = useState(false);

  const requestPermission = useCallback(() => {
    setIsRequesting(true);

    return requestNotificationPermission().finally(() => {
      revalidate();
      setIsRequesting(false);
    });
  }, [revalidate]);

  // フォアグラウンド時のメッセージ受信
  useEffect(() => {
    const messaging = getMessaging();
    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("Received foreground message ", payload);

      if (!payload.notification) return;

      // メッセージから通知のタイトルと本文を取得する
      const { title, body } = payload.notification;

      if (!title || !body) return;

      // 通知を作成して表示する
      const serviceWorkerRegistration =
        await navigator.serviceWorker.getRegistration();

      if (!serviceWorkerRegistration) return;
      serviceWorkerRegistration.showNotification(title, { body });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { permission, requestPermission, isRequesting };
}
