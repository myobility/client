import React, { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react";
import styled from "styled-components";
import { BUTTON } from "../common/index";

export const TagUI = styled.button<any>`
  appearance: none;
  width: 341.43px;
  height: 124.59px;
  background: ${props => props.isClicked ? `${BUTTON.default}` :  "none"};
  color: ${props => props.isClicked ? `${BUTTON.white}` : `${BUTTON.default}`};
  font-weight: 700;
  font-size: 58px;
  outline: 0;
  border: 0;
  border-radius: 89px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;
  border: 6px solid ${BUTTON.default};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

  &.checked {
    background: #7caa85;
    color: white;
  }
  transition-duration: 0.4s;

  margin-right: 2rem;
`;

export interface BtnProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  tagName: string;
}

export const TagBtn = (props: BtnProps) => {
  const [clicked, setClicked] = useState(false);

  const click = () => {
    setClicked((prev) => !prev);
    console.log("hello");
  }

  return (
    <>
      <TagUI onClick={click} isClicked={clicked} >{props.tagName}</TagUI>
    </>
  );
};
