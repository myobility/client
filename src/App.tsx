import { useEffect, useRef, useState } from "react";
import "./App.css";
// import "./agora.ts";
import { channelParameters, options, startBasicCall } from "./agora";
import AgoraRTC from "agora-rtc-sdk-ng";

function App() {
  const joinRef = useRef(null);
  const leaveRef = useRef(null);

  const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  const remotePlayerContainer = document.createElement("div");
  const localPlayerContainer = document.createElement("div");

  const startBasicCall = async () => {
    localPlayerContainer.id = options.uid.toString();
    localPlayerContainer.textContent = "Local user " + options.uid;
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
    await agoraEngine.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
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
    <div className="App">
      <div>
        <button type="button" id="join" ref={joinRef} onClick={handleJoine}>
          Join
        </button>
        <button type="button" id="leave" ref={leaveRef}>
          Leave
        </button>
      </div>
    </div>
  );
}

export default App;
