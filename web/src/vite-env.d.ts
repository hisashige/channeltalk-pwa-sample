/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FCM_WEBPUSH_KEY: string;
  readonly VITE_CHANNELTALK_PLUGINKEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
