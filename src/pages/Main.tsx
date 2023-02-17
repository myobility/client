import styled from "styled-components";
import { Logo } from "../components/Logo";
import { Container } from "../components/Container";
import { MainButton } from "../components/Main/MainButton";
import { Clock } from "../components/Clock";
import { Link } from "react-router-dom";


const BtnDiv = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgDiv = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default function Main() {
  return (
    <>
      <Container>
        <BtnDiv>
          <MainButton>랜덤 매칭</MainButton>
          <MainButton>관심사 매칭</MainButton>
          <Link to="/main/mypage">
            <MainButton>마이페이지</MainButton>
          </Link>
        </BtnDiv>
        <ImgDiv>
          <Logo></Logo>
          <Clock />
        </ImgDiv>
      </Container>
    </>
  );
}
