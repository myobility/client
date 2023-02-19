import styled from "styled-components";
import { Logo } from "../components/Logo";
import { Container } from "../components/Container";
import { MainButton } from "../components/Main/MainButton";
import { Clock } from "../components/Clock";
import { Link } from "react-router-dom";
import AvatarSrc from "../img/avatar.png";

import LeafLeftSrc from "../img/bg_left_leaf.png";
import LeafRightSrc from "../img/bg_right_leaf.png";

export const LeafLeft = styled.img.attrs({
    src: `${LeafLeftSrc}`
})`
    align-self: flex-end;
    z-index: 1;
`

export const LeafRight = styled.img.attrs({
    src: `${LeafRightSrc}`
})`
    align-self: flex-start;
    z-index: 1;
`

const Layout = styled.div`
  display: flex;
  align-items: center;
`;

const BtnDiv = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 4rem;
  z-index: 10;
`;

export const Avatar = styled.img.attrs({
  src: `${AvatarSrc}`
})`
 position: relative;
 right: 55rem;
 top: 2rem;
 z-index: 15;
`

export default function Main() {
  return (
    <>
      <Container>
        <Layout>
        <LeafLeft />
          <BtnDiv>
            <Link to="/">
              <MainButton>랜덤 매칭</MainButton>
            </Link>
            <Link to="/">
              <MainButton>관심사 매칭</MainButton>
            </Link>
            <Link to="/main/mypage">
              <MainButton>마이페이지</MainButton>
            </Link>
          </BtnDiv>
          <ImgDiv>
            <Logo></Logo>
            <Clock />
          </ImgDiv>
          {/* <Avatar/> */}
        <LeafRight style={{"position": "relative", "right":"10.5rem"}} />
        </Layout>
      </Container>
    </>
  );
}
