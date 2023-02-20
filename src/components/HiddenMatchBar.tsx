import styled from "styled-components";
import { BUTTON } from "./common";

const HiddenMatchBarStyle = styled.div`
    background-color: ${BUTTON.heartbeat};
    z-index: 15;
    width: 35rem;
    height: 6.3rem;
    border-radius: 54px;
    color: white;
    font-size: 3rem;
    font-weight: 700;
    

    display: flex;
    visibility: hidden;
    justify-content: center;
    align-items: center;
    position: relative;
    right: 6rem;
    margin-top: auto;
    bottom: 7rem;
`

export const HiddenMatchBar = () => {
    return (
        <>
            <HiddenMatchBarStyle>
                <p>다른 상대 찾기</p>
            </HiddenMatchBarStyle>
        </>
    )
}
