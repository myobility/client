import React from "react";
import { BUTTON } from "../common";
import styled, { keyframes } from "styled-components";

const LoadingContainer = styled.div`
  display: flex inline-block;
  height: 12rem;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  z-index: 30;
  
  position: relative;
  bottom: 19rem;
`;

const wave = keyframes`
  0% {
    height: 10px;
    transform: translate(0, 0);
  }
  50% {
    height: 175px;
    transform: translate(0, 84px);
  }
  100% {
    height: 10px;
    transform: translate(0, 0);
  }
`;

const Waveform = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 500px;
  height: 50px;
  margin: 0 5px;
`;

const Wave = styled.div`
  width: 100px;
  margin: 0 2px;
  background-color: ${BUTTON.heartbeat};
  animation: ${wave} 1s ease-in-out infinite;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <Waveform>
        <Wave style={{ animationDelay: "0.1s" }} />
        <Wave style={{ animationDelay: "0.2s" }} />
        <Wave style={{ animationDelay: "0.3s" }} />
        <Wave style={{ animationDelay: "0.4s" }} />
        <Wave style={{ animationDelay: "0.5s" }} />
        <Wave style={{ animationDelay: "0.6s" }} />
        <Wave style={{ animationDelay: "0.7s" }} />
        <Wave style={{ animationDelay: "0.8s" }} />
        <Wave style={{ animationDelay: "0.9s" }} />
        <Wave style={{ animationDelay: "1.0s" }} />
        <Wave style={{ animationDelay: "1.1s" }} />
        <Wave style={{ animationDelay: "1.2s" }} />
        <Wave style={{ animationDelay: "1.3s" }} />
        <Wave style={{ animationDelay: "1.4s" }} />
        <Wave style={{ animationDelay: "1.5s" }} />
        <Wave style={{ animationDelay: "1.6s" }} />
        <Wave style={{ animationDelay: "1.7s" }} />
        <Wave style={{ animationDelay: "1.8s" }} />
        <Wave style={{ animationDelay: "1.9s" }} />
        <Wave style={{ animationDelay: "2.0s" }} />
        <Wave style={{ animationDelay: "2.1s" }} />
        <Wave style={{ animationDelay: "2.2s" }} />
        <Wave style={{ animationDelay: "2.3s" }} />
        <Wave style={{ animationDelay: "2.4s" }} />
        <Wave style={{ animationDelay: "2.5s" }} />
        <Wave style={{ animationDelay: "2.6s" }} />
      </Waveform>
    </LoadingContainer>
  );
};

export default Loading;
