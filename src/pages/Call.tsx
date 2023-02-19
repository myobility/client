import { useRef, useState } from "react";
import io from "socket.io-client";

export const Call = () => {
  const socket = io(
    "https://port-0-server-node-r8xoo2mlebpgk2c.sel3.cloudtype.app/",
    {
      withCredentials: true,
    }
  );
  const localVideo = useRef<any>(null);
  const remoteVideo = useRef<any>(null);
  const muteBtn = useRef<any>(null);
  const cameraBtn = useRef<any>(null);

  let myStream: any;
  let muted = false;
  let cameraOff = false;
  let myPeerConnection: any;
  let myDataChannel;

  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      const currentCamera = myStream.getVideoTracks()[0];
      cameras.forEach((camera) => {
        const option = document.createElement("option");
        option.value = camera.deviceId;
        option.innerText = camera.label;
        if (currentCamera.label === camera.label) {
          option.selected = true;
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getMedia = async (deviceId?: string) => {
    const initialConstrains = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstrains
      );
      localVideo.current.srcObject = myStream;
      if (!deviceId) {
        await getCameras();
      }
    } catch (e) {
      console.log(e);
    }
  };
  function handleMuteClick() {
    myStream
      .getAudioTracks()
      .forEach((track: any) => (track.enabled = !track.enabled));
    if (!muted) {
      muteBtn.current.innerText = "Unmute";
      muted = true;
    } else {
      muteBtn.current.innerText = "Mute";
      muted = false;
    }
  }

  function handleCameraClick() {
    myStream
      .getVideoTracks()
      .forEach((track: any) => (track.enabled = !track.enabled));
    if (cameraOff) {
      cameraBtn.current.innerText = "Turn Camera Off";
      cameraOff = false;
    } else {
      cameraBtn.current.innerText = "Turn Camera On";
      cameraOff = true;
    }
  }

  const [roomName, setRoomName] = useState<string>("");

  const initCall = async () => {
    await getMedia();
    makeConnection();
  };
  const handleWelcomeSubmit = async (event: any) => {
    event.preventDefault();
    await initCall();
    socket.emit("join_room", roomName);
    setRoomName("");
  };
  function makeConnection() {
    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    myPeerConnection.addEventListener("icecandidate", handleIce);
    myPeerConnection.addEventListener("addstream", handleAddStream);
    myStream.getTracks().forEach((track: any) => {
      myPeerConnection.addTrack(track, myStream);
    });
  }

  function handleIce(data: any) {
    console.log("sent candidate");
    socket.emit("ice", data.candidate, roomName);
  }

  function handleAddStream(data: any) {
    remoteVideo.current.srcObject = data.stream;
  }

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });

  socket.on("message", (data) => {
    console.log("Received message: ", data);
  });
  socket.on("welcome", async () => {
    myDataChannel = myPeerConnection.createDataChannel("chat");
    myDataChannel.addEventListener("message", (event: MessageEvent) =>
      console.log(event.data)
    );
    console.log("made data channel");
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    socket.emit("offer", offer, roomName);
  });

  socket.on("offer", async (offer) => {
    myPeerConnection.addEventListener("datachannel", (event: any) => {
      myDataChannel = event.channel;
      myDataChannel.addEventListener("message", (event: MessageEvent) =>
        console.log(event.data)
      );
    });
    console.log("received the offer");
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit("answer", answer, roomName);
    console.log("sent the answer");
  });

  socket.on("answer", (answer) => {
    console.log("received the answer");
    myPeerConnection.setRemoteDescription(answer);
  });

  socket.on("ice", (ice) => {
    console.log("received candidate");
    myPeerConnection.addIceCandidate(ice);
  });

  return (
    <>
      <form onSubmit={handleWelcomeSubmit}>
        <input
          type="text"
          placeholder="room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input type="submit" value="입장" />
      </form>
      <h1>local</h1>
      <video autoPlay playsInline ref={localVideo}></video>
      <button onClick={handleMuteClick} ref={muteBtn}>
        mute
      </button>
      <button onClick={handleCameraClick} ref={cameraBtn}>
        hide
      </button>
      <h1>Remote</h1>
      <video autoPlay playsInline ref={remoteVideo}></video>
    </>
  );
};
