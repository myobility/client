import styled from "styled-components";
import LogoSrc from "../img/carmeet_logo.png";

export const LogoFont = styled.p`
    @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');
    font-family: 'Gochi Hand', cursive;
    color: #9BA29A;
    font-size: 250px;
    margin: auto;
    padding: 8rem;
`

export const LogoImg = styled.img.attrs({
    src: `${LogoSrc}`
})`
    width: 1257px;
    height: 357px;
    margin: auto;
    padding-bottom: 9rem;
`

export const Logo = () => {
    return(
        <>
            {/* <LogoFont>CARMEET</LogoFont> */}
            <LogoImg/>
        </>
    )
}