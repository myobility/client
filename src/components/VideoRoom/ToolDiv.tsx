import styled from "styled-components";
import KillTheCallSrc from "../../img/killTheCall.png";
import MuteSrc from "../../img/mute.png";
import CamSrc from "../../img/cam.png";

const ToolDivLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  z-index: 40;

  position: relative;
  left: 10rem;
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
export const ToolDiv = () => {
  return (
    <>
      <ToolDivLayout>
        <Mute />
        <KillTheCall />
        <Cam />
      </ToolDivLayout>
    </>
  );
};
