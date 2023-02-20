import styled from "styled-components";
import { TagLeft } from "../components/VideoRoom/TagLeft";
import { TagRight } from "../components/VideoRoom/TagRight";
import { Container } from "../components/Container";
import { GreenContainer } from "../components/VideoRoom/GreenContainer";
import { HalfContainer } from "../components/VideoRoom/HalfContainer";
import { FaceDiv } from "../components/VideoRoom/FaceDiv";
import { Heartbeat } from "../components/VideoRoom/Heartbeat";
import { Outlet } from "react-router-dom";



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
  right: 11rem;
`;

export default function VideoRoom() {
  return (
    <>
      <GreenContainer>
        <HalfContainer>
          <FaceArea>
            <FaceDiv
              style={{ position: "relative", top: "5.5rem", left: "15rem" }}
              />
          </FaceArea>
          <InfoArea>
            <Heartbeat bpm={97} />
            {/* <Loading></Loading> */}
            <TagsArea>
              <TagLeft tagName="여행" />
              <TagLeft tagName="노래" />
              <TagLeft tagName="MBTI" />
            </TagsArea>
          </InfoArea>
        </HalfContainer>
              <Outlet/>
        <GreenDiv>
          <FaceArea>
            <FaceDiv
              style={{ position: "relative", top: "3.4rem", right: "6rem" }}
            />
          </FaceArea>
          <InfoAreaRight>
            <Heartbeat bpm={122} />
            <TagsAreaRight>
              <TagRight tagName="여행" />
              <TagRight tagName="노래" />
              <TagRight tagName="MBTI" />
            </TagsAreaRight>
          </InfoAreaRight>
        </GreenDiv>
      </GreenContainer>
    </>
  );
}
