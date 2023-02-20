import styled from "styled-components";
import { COLOR } from "../common/index";

export const HalfContainer = styled.div`
  background-color: ${COLOR.background};
  min-width: 1144px;
  height: 832px;
  position: relative;
  left: 3rem;
  padding-left: 1rem;
  padding-right: 5rem;
  z-index: 10;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
