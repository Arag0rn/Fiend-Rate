'use client';
import Link from "next/link";
import BlockButton from "../components/HelloPage/BlockButton/page";
import BlockLogo from "../components/HelloPage/BlockLogo/page";
import BlockTitle from "../components/HelloPage/BlockTitle/page";
import Button from "../components/HelloPage/Button/page";
import ButtonIn from "../components/HelloPage/ButtonIn/page";
import Container from "../components/Container";
import Description from "../components/HelloPage/Description/page";
import HelloImage from "../components/HelloPage/HelloImage";
import LogoImage from "../components/HelloPage/LogoImage/page";
import Title from "../components/HelloPage/Title";
import styles from './page.module.scss';
import { useRouter } from "next/navigation";

const HelloPage = () => {
  const router = useRouter();

  return (
    <Container>
      <BlockLogo>
        <HelloImage></HelloImage>
        <LogoImage></LogoImage>
      </BlockLogo>
      <BlockTitle>
        <Title>Discover interesting people <br /> to talk with</Title>
        <Description>
          You need to Sing up or Sign in your account
          <br />
          to use all features
        </Description>
      </BlockTitle>
      <BlockButton>
        <Button onClick={() => router.push('/signup')}>Sign Up</Button>
        <ButtonIn onClick={() => router.push('/sign-in')}>Sign In</ButtonIn>
      </BlockButton>
      <Link className={styles['none-registration']} href='/'>Try without registration</Link>
    </Container>
  )
}

export default HelloPage