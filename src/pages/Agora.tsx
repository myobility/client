import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { _tokenURL } from "../global_variable";

interface ChannelOptions {
  localAudioTrack: any;
  localVideoTrack: any;
  remoteAudioTrack: any;
  remoteVideoTrack: any;
  remoteUid: any;
}

export const Agora = () => {
  const [channel, setChannel] = useState<string | any>("");

  let opt = {
    appId: "375caf4637d54221b4998836c698aa47",
    channel: "hello",
    token:
      "007eJxTYHjmr7e7yNzS2ITn19RVE/98mPyOuUZs98bZjboPz+zd/dNKgcHY3DQ5Mc3EzNg8xdTEyMgwycTS0sLC2CzZzNIiMdHE3Jn1fXJDICMDW5USKyMDBIL4rAwZqTk5+QwMAKOpH6Y=",
    uid: 0,
    serverUrl: _tokenURL,
    expiry: 60,
  };

  let channelParameters: ChannelOptions = {
    localAudioTrack: null,
    localVideoTrack: null,
    remoteAudioTrack: null,
    remoteVideoTrack: null,
    remoteUid: null,
  };
  const joinRef = useRef(null);
  const leaveRef = useRef(null);

  const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  const remotePlayerContainer = document.createElement("div");
  const localPlayerContainer = document.createElement("div");

  async function FetchToken() {
    return new Promise(function (resolve) {
      axios
        .get(
          `/token/rtc/${opt.channel}/1/uid/${opt.uid}/?expiry=${opt.expiry}`,
          {
            withCredentials: true, // 쿠키 cors 통신 설정
          }
        )
        .then((response) => {
          console.log(response.data.rtcToken);
          resolve(response.data.rtcToken);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  agoraEngine.on("token-privilege-will-expire", async function () {
    opt.token = await FetchToken().toString();
    await agoraEngine.renewToken(opt.token);
  });

  const startBasicCall = async () => {
    localPlayerContainer.id = opt.uid.toString();
    localPlayerContainer.textContent = "Local user " + opt.uid;
    localPlayerContainer.style.width = "640px";
    localPlayerContainer.style.height = "480px";
    localPlayerContainer.style.padding = "15px 5px 5px 5px";

    remotePlayerContainer.style.width = "640px";
    remotePlayerContainer.style.height = "480px";
    remotePlayerContainer.style.padding = "15px 5px 5px 5px";

    agoraEngine.on("user-published", async (user, mediaType) => {
      await agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");

      if (mediaType == "video") {
        channelParameters.remoteVideoTrack = user.videoTrack;
        channelParameters.remoteAudioTrack = user.audioTrack;
        channelParameters.remoteUid = user.uid.toString();
        remotePlayerContainer.id = user.uid.toString();
        channelParameters.remoteUid = user.uid.toString();
        remotePlayerContainer.textContent =
          "Remote user " + user.uid.toString();
        document.body.append(remotePlayerContainer);
        channelParameters.remoteVideoTrack.play(remotePlayerContainer);
      }
      if (mediaType == "audio") {
        channelParameters.remoteAudioTrack = user.audioTrack;
        channelParameters.remoteAudioTrack.play();
      }
      agoraEngine.on("user-unpublished", (user) => {
        console.log(user.uid + "has left the channel");
      });
    });
  };

  const handleJoine = async () => {
    if (channel == "") {
      window.alert("Channel name is required!");
      return;
    }
    opt.channel = channel;
    opt.token = await FetchToken().toString();

    await agoraEngine.join(opt.appId, opt.channel, opt.token, opt.uid);
    channelParameters.localAudioTrack =
      await AgoraRTC.createMicrophoneAudioTrack();
    channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    document.body.append(localPlayerContainer);
    await agoraEngine.publish([
      channelParameters.localAudioTrack,
      channelParameters.localVideoTrack,
    ]);
    channelParameters.localVideoTrack.play(localPlayerContainer);
    console.log("publish success!");
  };

  const handleLeave = async () => {
    channelParameters.localAudioTrack.close();
    channelParameters.localVideoTrack.close();
    removeVideoDiv(remotePlayerContainer.id);
    removeVideoDiv(localPlayerContainer.id);
    await agoraEngine.leave();
    console.log("You left the channel");
    window.location.reload();
  };

  const removeVideoDiv = (elementId: string) => {
    console.log("Removing " + elementId + "Div");
    let Div = document.getElementById(elementId);
    if (Div) {
      Div.remove();
    }
  };

  useEffect(() => {
    startBasicCall();
  }, []);

  return (
    <div>
      <input
        type="text"
        id="textbox"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
      />
      <button type="button" id="join" ref={joinRef} onClick={handleJoine}>
        Join
      </button>
      <button type="button" id="leave" ref={leaveRef} onClick={handleLeave}>
        Leave
      </button>
    </div>
  );
};
