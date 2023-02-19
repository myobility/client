import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled from "styled-components";
import { BUTTON } from "../common/index";

export const TagUI = styled.button`
  appearance: none;
  width: 341.43px;
  height: 124.59px;
  /* background: ${(props) => (props.toggle ? "none" : "#7caa85")}; */
  background: none;
  color: ${BUTTON.default};
  font-weight: 700;
  font-size: 58px;
  outline: 0;
  border: 0;
  border-radius: 89px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;
  border: 6px solid #7caa85;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  /* filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25)); */

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
  return (
    <>
      <TagUI>{props.tagName}</TagUI>
    </>
  );
};
