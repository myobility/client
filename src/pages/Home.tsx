import { Logo } from "../components/Logo";
import { Container } from "../components/Container";
import { MainButton } from "../components/Main/MainButton";

export default function Home() {
  return (
    <>
      <Container>
        <Logo>CARMEET</Logo>
        <MainButton>랜덤 매칭</MainButton>
      </Container>
    </>
  );
}
