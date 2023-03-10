import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Coordinates, Position } from "../types";

export const Call = () => {
  const [uid, setUid] = useState<number>(0);
  const [roomName, setRoomName] = useState<string>("");
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const [targetUid, setTargetUid] = useState<number | undefined>(undefined);

  const socket = io(
    "https://port-0-server-node-luj2cle9ghnxl.sel3.cloudtype.app",
    // "http://localhost:3000/", //로컬 테스트용
    {
      withCredentials: true,
    }
  );
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

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
      console.log("[1] getUserMedia()");
      console.log("MyStream: ", myStream);
      localVideo.current!.srcObject = myStream;
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
      // muteBtn.current.innerText = "Unmute";
      muted = true;
    } else {
      // muteBtn.current.innerText = "Mute";
      muted = false;
    }
  }

  function handleCameraClick() {
    myStream
      .getVideoTracks()
      .forEach((track: any) => (track.enabled = !track.enabled));
    if (cameraOff) {
      // cameraBtn.current.innerText = "Turn Camera Off";
      cameraOff = false;
    } else {
      // cameraBtn.current.innerText = "Turn Camera On";
      cameraOff = true;
    }
  }

  const initCall = async () => {
    await getMedia();
    makeConnection();
  };

  const makeConnection = () => {
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
    console.log("[2] addStream()");
    myStream.getTracks().forEach((track: any) => {
      myPeerConnection.addTrack(track, myStream);
    });
  };

  //매칭 시작
  const handleMatching = async () => {
    const newUid = Date.now();
    try {
      socket.emit("matching", newUid, await getCurrentLocation());
      setUid(newUid);
    } catch (error) {
      console.log(error);
    }
    // await initCall();
  };

  const handleMatchStart = async () => {
    socket.emit("join_call", uid, targetUid);
    await initCall();
  };

  const handleReMatch = async () => {
    socket.emit("re_match", uid, targetUid, await getCurrentLocation());
  };

  function handleIce(data: any) {
    console.log("sent candidate");
    socket.emit("ice", data.candidate, uid, targetUid);
  }

  function handleAddStream(data: any) {
    console.log("Remoted!!!!!!!!!!!!!!!!!");
    console.log("RemoteStream: ", data.stream);
    remoteVideo.current!.srcObject = data.stream;
  }

  const getCurrentLocation = async (): Promise<Coordinates> => {
    return new Promise<Coordinates>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by this browser.");
      }

      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          const { latitude, longitude, accuracy } = position.coords;
          resolve({ latitude, longitude, accuracy });
        },
        (error) => reject(error)
      );
    });
  };

  socket.on("connect", () => {
    //socket 서버 연결완료
    console.log("Connected to Socket.IO server");
  });

  socket.on("matching", (massage: any) => {
    console.log(massage);
    // await initCall();
    setIsMatched(true);
  });

  socket.on("matched", (massage: any) => {
    console.log("매칭완료: ", massage);
    setTargetUid(massage);
  });

  socket.on("cancel_match", async () => {
    console.log("상대방이 매칭을 취소하였습니다.: ");
    setIsMatched(false);
    socket.emit("matching", uid, await getCurrentLocation());
  });

  //대기 중 사용자가 들어왔을 때
  socket.on("welcome", async (target_uid: any) => {
    console.log("상대방이 연결을 하여씁니다.");
    await initCall();
    // myDataChannel = myPeerConnection.createDataChannel("chat");
    // myDataChannel.addEventListener("message", (event: any) =>
    //   console.log(event.data)
    // );
    console.log("made data channel");
    const offer = await myPeerConnection.createOffer();
    console.log("welcome createOffer()");
    myPeerConnection.setLocalDescription(offer);
    console.log("welcome setLocalDescription()");
    socket.emit("offer", offer, uid, target_uid);
  });

  socket.on("offer", async (offer: any) => {
    // myPeerConnection.addEventListener("datachannel", (event: any) => {
    //   myDataChannel = event.channel;
    //   myDataChannel.addEventListener("message", (event: any) =>
    //     console.log(event.data)
    //   );
    // });
    console.log("received the offer");
    myPeerConnection.setRemoteDescription(offer);
    console.log("offer setRemoteDescription()");
    const answer = await myPeerConnection.createAnswer();
    console.log("offer createAnswer()");
    myPeerConnection.setLocalDescription(answer);
    console.log("offer setLocalDescription()");
    socket.emit("answer", answer, uid, targetUid);
    console.log("sent the answer");
  });

  socket.on("answer", async (answer: any) => {
    console.log("received the answer");
    myPeerConnection.setRemoteDescription(answer);
    console.log("answer ", answer);
    console.log("answer setRemoteDescription()");
  });

  socket.on("ice", (ice: any) => {
    console.log("received candidate");
    myPeerConnection.addIceCandidate(ice);
    console.log("ice ", ice);
    console.log("ice addIceCandidate()");
  });

  // useEffect(() => {}, []);

  return (
    <>
      <h1>My UID: {uid}</h1>
      {!isMatched && <button onClick={handleMatching}>매칭</button>}
      {targetUid && (
        <>
          <h3>{targetUid} 유저와 통화하겠습니까?</h3>
          <button onClick={handleMatchStart}>통화하기</button>
          <button onClick={handleReMatch}>넘기기</button>
        </>
      )}
      <h1>local</h1>
      <video autoPlay playsInline ref={localVideo}></video>
      <button onClick={handleMuteClick}>mute</button>
      <button onClick={handleCameraClick}>hide</button>
      <h1>Remote</h1>
      <video id="peerFace" autoPlay playsInline ref={remoteVideo}></video>
    </>
  );
};
