import { Logo } from "../components/Logo";
import { Container } from "../components/Container";
import styled from "styled-components";
import { BUTTON } from "../components/common/index";
import { Link } from "react-router-dom";
import { LeafLeft } from "../components/Leafs";
import { LeafRight } from "../components/Leafs";


export const LayoutRow = styled.div`
  display: flex;
  flex-direction: row;
`
;
export const LayoutCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 104.3rem;
  padding-bottom: 6rem;
`;


export const StartBtn = styled.button`
  width: 329px;
  height: 107px;
  background-color: ${BUTTON.default};
  color: white;
  font-size: 45px;
  font-weight: 700;
  outline: 0;
  border: 0;
  border-radius: 55px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  padding-top: -5rem;

  &:hover {
    background-color: ${BUTTON.hover};
  }
  &:active {
    background-color: ${BUTTON.pressed};
  }
  transition-duration: 0.4s;
  letter-spacing: 0.2rem;

  position: relative;
  bottom: 10rem;
`;

export default function Home() {
  return (
    <>
      <Container>
        <LayoutRow>
          <LeafLeft/>
          <LayoutCol>
          <Logo />
          <Link to="/main">
            <StartBtn>시작하기</StartBtn>
          </Link>
          </LayoutCol>
          <LeafRight/>
        </LayoutRow>
      </Container>
    </>
  );
}
