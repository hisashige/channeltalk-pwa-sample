import { Box, Text, Button } from "@chakra-ui/react";
import "./App.css";
import { useNotification } from "./hooks/useNotification";
import { loadScript, boot, onChatCreated } from "./lib/channelTalk";
import { useEffect } from "react";

loadScript();

function App() {
  const { permission, isRequesting, requestPermission } = useNotification();

  let initialized = false;
  useEffect(() => {
    if (initialized) return;
    boot();
    onChatCreated();

    return () => {
      initialized = true;
    };
  }, []);

  return (
    <>
      <div>
        <img src="/app_icon/icon-512.png" className="logo" alt="logo" />
      </div>
      <h1>
        チャネルトーク
        <br />
        PUSH通知検証くん
      </h1>
      <div className="card">
        <Box>
          {permission === "not-supported" ? (
            <Text>プッシュ通知がサポートされていません</Text>
          ) : permission === "denied" ? (
            <Text>プッシュ通知を拒否しました</Text>
          ) : permission === "granted" ? (
            <Text>プッシュ通知を許可しています！</Text>
          ) : (
            <Button onClick={requestPermission} isLoading={isRequesting}>
              通知を受け取る
            </Button>
          )}
        </Box>
      </div>
    </>
  );
}

export default App;
