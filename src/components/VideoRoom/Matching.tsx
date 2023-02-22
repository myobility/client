import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BUTTON } from "../common";

const ToastStyle = styled.div<any>`
  background-color: ${props => props.isMatched ? `${BUTTON.default}` : `${BUTTON.pressed}`};
  z-index: 40;
  padding: 1.5rem;
  width: 10rem;
  margin: auto;
  border-radius: 5rem;
  color: white;
  font-size: 2rem;
  font-weight: 500;
  box-shadow: 0px 4px 10px rgba(42, 42, 42, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 14rem;
/* 
  @keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes slideOut {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-300%);
  }
}*/
`;

export const Matching = () => {
  const [matching, setMatching] = useState(true);

  const matched = () => {
    setMatching((prev) => !prev);
    console.log("hello");
  };

  return (
    <>
        <ToastStyle onClick={matched} className="matching" isMatched={matching}>
          {matching ? "탐색 중" : "매칭 완료!"}
        </ToastStyle>
    </>
  );
};