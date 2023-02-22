import { useEffect, useRef } from "react";
import styled from "styled-components";
import { BUTTON } from "../common";

const MatchBarStyle = styled.div`
  background-color: ${BUTTON.heartbeat};
  z-index: 15;
  min-width: 32rem;
  height: 6.3rem;
  border-radius: 54px;
  color: white;
  font-size: 3rem;
  font-weight: 700;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(42, 42, 42, 0.25);
  display: flex;
  /* visibility: hidden; */
  justify-content: center;
  align-items: center;
  position: relative;
  right: 32.8rem;
  margin-top: auto;
  bottom: 7rem;
`;

const Animation = styled.div<any>`
  z-index: 20;
  min-width: 32rem;
  height: 6.3rem;
  background-color: ${BUTTON.gauge};
  border-radius: 54px;
  opacity: 90%;
  position: relative;
  left: 17.5rem;

  transition: 4s cubic-bezier(0.4, 0, 1, 1);
`;

const Ptag = styled.div`
  z-index: 25;
  min-width: 35rem;
  position: relative;
  right: 7rem;
`;

export const MatchBar = () => {
  useEffect(() => {
    setTimeout(
      () => (document.getElementById("loader")!.style.left = "-17.5rem"),
      500
    );
  }, []);

  return (
    <>
      <MatchBarStyle>
        <Animation id="loader"></Animation>
        <Ptag>다른 상대 찾기</Ptag>
      </MatchBarStyle>
    </>
  );
};
