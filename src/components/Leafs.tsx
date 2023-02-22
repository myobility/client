import styled from "styled-components";
import LeafLeftSrc from "../img/bg_left_leaf.png";
import LeafRightSrc from "../img/bg_right_leaf.png";

export const LeafLeft = styled.img.attrs({
    src: `${LeafLeftSrc}`
})`
    align-self: flex-end;
    z-index: 0;
`

export const LeafRight = styled.img.attrs({
    src: `${LeafRightSrc}`
})`
    align-self: flex-start;
    z-index: 0;
`