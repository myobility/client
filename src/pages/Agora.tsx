import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { _appId, _tokenURL } from "../global_variable";

interface ChannelOptions {
  localAudioTrack: any;
  localVideoTrack: any;
  remoteAudioTrack: any;
  remoteVideoTrack: any;
  remoteUid: any;
}

type OptionType = {
  appId: string;
  channel: string;
  token: string | null;
  uid: string | number;
  serverUrl: string;
  expiry: string | number;
};

export const Agora = () => {
  const [option, setOption] = useState<OptionType>({
    appId: _appId,
    channel: "",
    token: null,
    uid: 0,
    serverUrl: _tokenURL,
    expiry: 3600,
  });

  let channelParameters: ChannelOptions = {
    localAudioTrack: null,
    localVideoTrack: null,
    remoteAudioTrack: null,
    remoteVideoTrack: null,
    remoteUid: null,
  };
  const joinRef = useRef<HTMLButtonElement>(null);
  const leaveRef = useRef<HTMLButtonElement>(null);
  const localVideo = useRef<HTMLDivElement>(null);
  const remoteVideo = useRef<HTMLDivElement>(null);

  const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  async function FetchToken() {
    return new Promise<string>(function (resolve) {
      axios
        .get(
          `/token/rtc/${option.channel}/1/uid/${option.uid}/?expiry=${option.expiry}`,
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
    handleOnChange("token", await FetchToken());
    option.token && (await agoraEngine.renewToken(option.token));
  });

  const initCall = async () => {
    console.log("initCall");
    localVideo.current!.id = option.uid.toString();
    agoraEngine.on("user-published", async (user, mediaType) => {
      await agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");

      if (mediaType == "video") {
        channelParameters.remoteVideoTrack = user.videoTrack;
        channelParameters.remoteAudioTrack = user.audioTrack;
        channelParameters.remoteUid = user.uid;
        remoteVideo.current!.id = user.uid.toString();

        channelParameters.remoteUid = user.uid;
        channelParameters.remoteVideoTrack.play(remoteVideo.current);
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
    if (option.channel == "") {
      window.alert("Channel name is required!");
      return;
    }
    handleOnChange("token", await FetchToken());
    handleOnChange(
      "uid",
      await agoraEngine.join(option.appId, option.channel, option.token)
    );
    channelParameters.localAudioTrack =
      await AgoraRTC.createMicrophoneAudioTrack();
    channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

    await agoraEngine.publish([
      channelParameters.localAudioTrack,
      channelParameters.localVideoTrack,
    ]);
    channelParameters.localVideoTrack.play(localVideo.current);
    console.log("publish success!");
  };

  const handleLeave = async () => {
    channelParameters.localAudioTrack.close();
    channelParameters.localVideoTrack.close();
    await agoraEngine.leave();
    console.log("You left the channel");
    window.location.reload();
  };

  const handleOnChange = (key: string, value: string | number) => {
    setOption((prevState) => {
      return { ...prevState, [key]: value }; // 새로운 객체 생성
    });
  };

  useEffect(() => {
    initCall();
  }, []);
  return (
    <div>
      <input
        type="text"
        id="textbox"
        value={option.channel}
        onChange={(e) => handleOnChange("channel", e.target.value)}
      />
      <input
        type="text"
        id="userID"
        value={option.uid}
        onChange={(e) => handleOnChange("uid", e.target.value)}
      />
      <button type="button" id="join" ref={joinRef} onClick={handleJoine}>
        Join
      </button>
      <button type="button" id="leave" ref={leaveRef} onClick={handleLeave}>
        Leave
      </button>
      <div>
        <li>token: {option.token}</li>
        <li>uid: {option.uid}</li>
        <li>channel: {option.channel}</li>
      </div>
      <div
        style={{
          width: "300px",
          height: "200px",
          backgroundColor: "#ddd",
          padding: "2rem",
        }}
        ref={localVideo}
      ></div>
      <br />
      <div
        style={{
          width: "300px",
          height: "200px",
          backgroundColor: "#9de",
          padding: "2rem",
        }}
        ref={remoteVideo}
      ></div>
    </div>
  );
};
