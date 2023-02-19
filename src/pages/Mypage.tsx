import styled from "styled-components";
import { Container } from "../components/Container";
import { BUTTON } from "../components/common";
import { TagBtn } from "../components/Mypage/TagBtn";
import { LeafLeft } from "../components/Leafs";
import LeafRightSrc from "../img/bg_right_leaf.png";

export const LayoutRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: inherit;
`;

export const LayoutCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  left: -6rem;
  min-width: 86%;
  z-index: 10;
`;

export const Title = styled.p`
  color: ${BUTTON.default};
  font-size: 4.81rem;
  font-weight: 700;
  justify-self: flex-start;
  align-self: flex-start;
  margin: 0;
  padding-bottom: 4rem;
`;

export const LeafRight = styled.img.attrs({
  src: `${LeafRightSrc}`
})`
  position: relative;
  right: 18.8rem;
  align-self: flex-start;
  z-index: 0;
`

export const TagDiv = styled.div`
  /* background-color: gray; */
  /* padding: 13rem 60rem 13rem 60rem; */
`;
export const TagLine = styled.div<{ margin: string }>`
  margin-left: ${(props) => props.margin};
`;



export default function Mypage() {
  const tags1 = ["노래", "MBTI", "취미", "카페", "영화"];
  const tags2 = ["드라마", "여행", "연예인", "패션", "화장품"];
  const tags3 = ["게임", "재테크", "언어", "정치", "종교"];
  return (
    <>
      <Container>
        <LayoutRow>
          <LeafLeft />
          <LayoutCol>
            <Title>나의 관심사를 골라보아요</Title>
            <TagDiv>
              <TagLine margin="2rem;">
                {tags1.map((e) => (
                  <TagBtn tagName={e}></TagBtn>
                ))}
              </TagLine>
              <TagLine margin="6rem;">
                {tags2.map((e) => (
                  <TagBtn tagName={e}></TagBtn>
                ))}
              </TagLine>
              <TagLine margin="-1rem;">
                {tags3.map((e) => (
                  <TagBtn tagName={e}></TagBtn>
                ))}
              </TagLine>
            </TagDiv>
          </LayoutCol>
          <LeafRight />
        </LayoutRow>
      </Container>
    </>
  );
}
