import styled from "styled-components";
import { COLOR } from "../common/index";

export const HalfContainer = styled.div`
  background-color: ${COLOR.background};
  min-width: 1122px;
  height: 832px;
  position: relative;
  left: 15rem;
  padding-left: 1rem;
  padding-right: 4rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;