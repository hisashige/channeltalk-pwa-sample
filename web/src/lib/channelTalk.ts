import * as ChannelService from "@channel.io/channel-web-sdk-loader";

export const loadScript = () => {
  ChannelService.loadScript();
};

export const boot = () => {
  ChannelService.boot({
    pluginKey: import.meta.env.VITE_CHANNELTALK_PLUGINKEY as string,
  });
};
