import styled from "styled-components";
import { BUTTON } from "../common";

export const HeartDiv = styled.div`
  width: 19.3rem;
  height: 6.8rem;
  background-color: ${BUTTON.heartbeat};
  box-shadow: 0px 4px 10px rgba(42, 42, 42, 0.25);
  border-radius: 3.3rem;
  font-size: 3.5rem;
  color: white;
  font-size: 3.6rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 10;
`;

const Heart = styled.span`
  font-weight: 400;
  display: flex;
`;

export interface BpmProps {
  bpm: number;
}

export const Heartbeat = (props: BpmProps) => {
  return (
    <>
      <HeartDiv>
        <Heart>❤</Heart>
        {props.bpm}
      </HeartDiv>
    </>
  );
};