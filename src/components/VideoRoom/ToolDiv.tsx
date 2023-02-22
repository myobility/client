import styled from "styled-components";
import KillTheCallSrc from "../../img/killTheCall.png";
import MuteSrc from "../../img/mute.png";
import CamSrc from "../../img/cam.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ToolDivLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  z-index: 40;

  position: relative;
  /* left: 10rem; */
`;

const KillTheCall = styled.img.attrs({
  src: `${KillTheCallSrc}`,
})`
  padding-bottom: 2rem;
`;

const Mute = styled.img.attrs({
  src: `${MuteSrc}`,
})`
  padding-bottom: 2rem;
`;

const Cam = styled.img.attrs({
  src: `${CamSrc}`,
})`
  padding-bottom: 2rem;
`;

const Time = styled.div`
  color: #555555;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  padding-top: 1rem;
`;

export const ToolDiv = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor((timeElapsed % 3600) / 60);
  const seconds = timeElapsed % 60;

  return (
    <>
      <ToolDivLayout>
        <Mute />
        <Link to="/">
          <KillTheCall />
        </Link>
        <Cam />
        <Time>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </Time>
      </ToolDivLayout>
    </>
  );
};
