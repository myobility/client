import styled from "styled-components";
import { TagLeft } from "../components/VideoRoom/TagLeft";
import { TagRight } from "../components/VideoRoom/TagRight";
import { COLOR } from "../components/common";
import { HalfContainer } from "../components/VideoRoom/HalfContainer";
import { GreenContainer } from "../components/VideoRoom/GreenContainer";
import { FaceDiv } from "../components/VideoRoom/FaceDiv";
import { Heartbeat } from "../components/VideoRoom/Heartbeat";
import { Outlet } from "react-router-dom";
import { Matching } from "../components/VideoRoom/Matching";
import Loading from "../components/VideoRoom/Loading";

import io from "socket.io-client";
import { Coordinates, Position } from "../types";
import { useEffect, useRef, useState } from "react";
import { HiddenMatchBar } from "../components/VideoRoom/HiddenMatchBar";
import { MatchBar } from "../components/VideoRoom/MatchBar";

const FaceArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: auto;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 7rem;
  padding-bottom: 5rem;
`;

const InfoAreaRight = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
  padding-bottom: 4rem;
  position: relative;
  bottom: 2rem;
  align-items: flex-end;
`;

const TagsArea = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
`;

const TagsAreaRight = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
`;

const GreenDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  right: 22rem;
`;

const MatchInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  right: 1rem;
`;

export default function VideoRoom() {
  const [uid, setUid] = useState<number>(0);
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const [targetUid, setTargetUid] = useState<number | undefined>(undefined);
  const [isCalling, setIsCalling] = useState<boolean>(false);

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

  socket.on("match_start", () => {
    console.log("match_start");
    handleMatchStart();
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
    setIsCalling(true);
  });

  useEffect(() => {
    handleMatching();
  }, []);

  return (
    <>
      <GreenContainer>
        <HalfContainer
          style={{
            left: isCalling ? "initial" : "15rem",
            minWidth: isCalling ? "initial" : "1122px",
          }}
        >
          <FaceArea>
            <FaceDiv
              autoPlay
              playsInline
              style={
                !isCalling
                  ? {
                      position: "relative",
                      top: "5.5rem",
                      left: "15rem",
                    }
                  : {}
              }
              ref={localVideo}
            />
          </FaceArea>
          {!isCalling && (
            <InfoArea>
              <Heartbeat bpm={97} />
              {/* <Loading></Loading> */}
              <TagsArea>
                <TagLeft tagName="여행" />
                <TagLeft tagName="노래" />
                <TagLeft tagName="MBTI" />
              </TagsArea>
            </InfoArea>
          )}
        </HalfContainer>

        <MatchInfoDiv>
          {!isCalling && <Matching {...{ isMatched: isMatched }} />}

          {/* <Matching {...{ isMatched: isMatched }} /> */}
          <Loading />
        </MatchInfoDiv>
        {/* {isCalling} */}
        {!isMatched ? <HiddenMatchBar /> : <MatchBar />}
        {/* <Outlet /> */}

        <GreenDiv>
          <FaceArea>
            <FaceDiv
              autoPlay
              playsInline
              style={{ position: "relative", top: "3.4rem", right: "6rem" }}
              ref={remoteVideo}
            />
          </FaceArea>

          {!isCalling && (
            <InfoAreaRight>
              <Heartbeat bpm={122} />
              <TagsAreaRight>
                <TagRight tagName="여행" />
                <TagRight tagName="노래" />
                <TagRight tagName="MBTI" />
              </TagsAreaRight>
            </InfoAreaRight>
          )}
        </GreenDiv>
      </GreenContainer>
    </>
  );
}
