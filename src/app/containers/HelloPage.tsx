'use client';
import Link from "next/link";
import BlockLogo from "../components/HelloPage/BlockLogo";
import BlockTitle from "../components/HelloPage/BlockTitle";
import Button from "../components/HelloPage/Button";
import ButtonIn from "../components/HelloPage/ButtonIn";
import MainContainer from "../components/MainContainer";
import Description from "../components/HelloPage/Description/styles";
import HelloImage from "../components/HelloPage/HelloImage";
import LogoImage from "../components/HelloPage/LogoImage";
import Title from "../components/HelloPage/Title";
import styles from './page.module.scss';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from '../components/Loader';
import BlockButton from "../components/HelloPage/BlockButton";

const HelloPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(true), 1000)
  }, []);

  if (!loading) return <Loader />;

  return (
    <MainContainer>
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
    </MainContainer>
  )
}

export default HelloPage;