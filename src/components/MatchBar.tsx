import styled from "styled-components";
import { BUTTON } from "./common";

const MatchBarStyle = styled.div`
  background-color: ${BUTTON.heartbeat};
  z-index: 15;
  min-width: 22rem;
  height: 6.3rem;
  border-radius: 54px;
  color: white;
  font-size: 3rem;
  font-weight: 700;
  overflow: hidden;

  display: flex;
  /* visibility: hidden; */
  justify-content: center;
  align-items: center;
  position: relative;
  right: 17rem;
  margin-top: auto;
  bottom: 7rem;
  padding-right: 9rem;
  padding-left: 9rem;

`;

const Animation = styled.div`
  z-index: 20;
  min-width: 40rem;
  height: 6.3rem;
  background-color: ${BUTTON.gauge};
  border-radius: 54px;
  /* visibility: hidden; */
  opacity: 90%;

  position: relative;
  left: 17.5rem;
  &:hover {
    transform: rotateY(90deg);
    transform-origin: 0 100%;
    transition: transform 10s;
  }

  clip: rect(4rem 4rem 4rem 4rem);
`;

const Ptag = styled.div`
  z-index: 25;
  min-width: 35rem;
  position: relative;
  right: 11rem;
`;

export const MatchBar = () => {
  return (
    <>
      <MatchBarStyle>
        <Animation></Animation>
        <Ptag>다른 상대 찾기</Ptag>
      </MatchBarStyle>
    </>
  );
};
