import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import { setPushNotificationInfo } from "./firebase";

export const loadScript = () => {
  ChannelService.loadScript();
};

export const boot = () => {
  ChannelService.boot(
    {
      pluginKey: import.meta.env.VITE_CHANNELTALK_PLUGINKEY as string,
      hidePopup: true,
    },
    (error, user) => {
      if (error) {
        console.error(error);
      } else {
        console.log("boot success", user);
        localStorage.setItem("channeltalk-user", JSON.stringify(user));
      }
    }
  );
};

// チャットが作られた際に、通知許可があるかつ、channeltalkのuser情報を保持していれば、firestoreにPUSH通知用の情報を保存する。
export const onChatCreated = () => {
  ChannelService.onChatCreated(() => {
    const permission = Notification.permission;
    console.log("create!", permission);

    if (permission !== "granted") return;

    const user = localStorage.getItem("channeltalk-user");
    const token = localStorage.getItem("push-token");
    if (!user || !token) return;

    const userObj = JSON.parse(user) as ChannelService.User;

    setPushNotificationInfo(userObj, token);
  });
};
