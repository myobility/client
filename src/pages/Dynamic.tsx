import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { _appId, _tokenURL } from "../global_variable";

export const Dynamic = () => {
  let options = {
    // Pass your App ID here.
    appId: _appId,
    // Set the channel name.
    channel: "",
    // Pass your temp token here.
    token: "",
    // Set the user ID.
    uid: 0,
    // Set the user role.
    role: "",
    // Set token expire time.
    ExpireTime: 60,
    // The base URL to your token server. For example, https://agora-token-service-production-92ff.up.railway.app".
    serverUrl: _tokenURL,
  };

  // Agora.io SDK 초기화
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

  const channelId = "asd";
  const uid = 0;

  return <h1>dynamic</h1>;
};
