import AgoraRTC from "agora-rtc-sdk-ng";

export let options = {
  appId: "375caf4637d54221b4998836c698aa47",
  channel: "hello",
  token:
    "007eJxTYGhYVBf8Z9Mdpuk+fSs3ipr/1V2UxZy15acF83r3VMfKDbEKDMbmpsmJaSZmxuYppiZGRoZJJpaWFhbGZslmlhaJiSbmfRwvkxsCGRlqKrmYGBkgEMRnZchIzcnJZ2AAADCYHj8=",
  uid: 0,
};

interface ChannelOptions {
  localAudioTrack: any;
  localVideoTrack: any;
  remoteAudioTrack: any;
  remoteVideoTrack: any;
  remoteUid: any;
}

export let channelParameters: ChannelOptions = {
  localAudioTrack: null,
  localVideoTrack: null,
  remoteAudioTrack: null,
  remoteVideoTrack: null,
  remoteUid: null,
};
export async function startBasicCall() {
  const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  const remotePlayerContainer = document.createElement("div");
  const localPlayerContainer = document.createElement("div");
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
      remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
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
  window.onload = function () {
    // document.getElementById("join")!.onclick = async function () {
    //   await agoraEngine.join(
    //     options.appId,
    //     options.channel,
    //     options.token,
    //     options.uid
    //   );
    //   channelParameters.localAudioTrack =
    //     await AgoraRTC.createMicrophoneAudioTrack();
    //   channelParameters.localVideoTrack =
    //     await AgoraRTC.createCameraVideoTrack();
    //   document.body.append(localPlayerContainer);
    //   await agoraEngine.publish([
    //     channelParameters.localAudioTrack,
    //     channelParameters.localVideoTrack,
    //   ]);
    //   channelParameters.localVideoTrack.play(localPlayerContainer);
    //   console.log("publish success!");
    // };
    document.getElementById("leave")!.onclick = async function () {
      channelParameters.localAudioTrack.close();
      channelParameters.localVideoTrack.close();
      removeVideoDiv(remotePlayerContainer.id);
      removeVideoDiv(localPlayerContainer.id);
      await agoraEngine.leave();
      console.log("You left the channel");
      window.location.reload();
    };
  };
}
startBasicCall();

function removeVideoDiv(elementId: string) {
  console.log("Removing " + elementId + "Div");
  let Div = document.getElementById(elementId);
  if (Div) {
    Div.remove();
  }
}
