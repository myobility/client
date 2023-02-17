import styled from "styled-components";
import { BUTTON } from "../common/index";

export const MainButton = styled.button`
  width: 514.53px;
  height: 205.45px;
  background-color: ${BUTTON.default};
  color: white;
  font-size: 58px;
  font-weight: 700;
  outline: 0;
  border: 0;
  border-radius: 55px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;

  &:hover {
    background-color: ${BUTTON.hover};
  }
  &:active {
    background-color: ${BUTTON.pressed};
  }
  transition-duration: 0.4s;
`;
