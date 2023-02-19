import styled from "styled-components";
import { COLOR } from "../common/index";

export const HalfContainer = styled.div`
  background-color: ${COLOR.background};
  width: 1144px;
  height: 832px;
  position: relative;
  right: 0px;
  margin-right: auto;
  z-index: 10;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
