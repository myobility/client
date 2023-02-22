import { useEffect, useRef } from "react";
import styled from "styled-components";
import { BUTTON } from "../common";

const HiddenMatchBarStyle = styled.div`
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
  visibility: hidden;
  justify-content: center;
  align-items: center;
  position: relative;
  right: 32.8rem;
  margin-top: auto;
  bottom: 7rem;
`;

const Animation = styled.div`
  z-index: 20;
  min-width: 32rem;
  height: 6.3rem;
  background-color: ${BUTTON.gauge};
  border-radius: 54px;
  visibility: hidden;
  opacity: 90%;
  position: relative;
  left: 17.5rem;

  transition: 10s cubic-bezier(0.25, 0.47, 0.12, 0.99);
`;

const Ptag = styled.div`
  z-index: 25;
  min-width: 35rem;
  position: relative;
  right: 7rem;
`;

export const HiddenMatchBar = () => {
  const loadBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadBar.current!.style.left = "-16rem";
  }, []);

  return (
    <>
      <HiddenMatchBarStyle>
        <Animation ref={loadBar}></Animation>
        <Ptag>다른 상대 찾기</Ptag>
      </HiddenMatchBarStyle>
    </>
  );
};