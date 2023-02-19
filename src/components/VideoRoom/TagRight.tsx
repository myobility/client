import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled from "styled-components";
import { BUTTON } from "../common/index";

export const TagUI = styled.div`
  width: 9.6rem;
  height: 3.3rem;
  background-color: ${BUTTON.default};
  color: white;
  font-size: 1.7rem;
  font-weight: 700;
  outline: 0;
  border: 0;
  border-radius: 89px;
  box-shadow: 0px 4px 10px rgba(42, 42, 42, 0.25);
  margin-left: 1.3rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface BtnProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  tagName: string;
}

export const TagRight = (props: BtnProps) => {
  return (
    <>
      <TagUI>{props.tagName}</TagUI>
    </>
  );
};
