'use client';
import Link from "next/link";
import BlockLogo from "../components/HelloPage/BlockLogo";
import BlockTitle from "../components/HelloPage/BlockTitle";
import Button from "../components/HelloPage/Button";
import ButtonIn from "../components/HelloPage/ButtonIn";
import Description from "../components/HelloPage/Description";
import Container from "../components/Container";
import HelloImage from "../components/HelloPage/HelloImage";
import LogoImage from "../components/HelloPage/LogoImage";
import Title from "../components/HelloPage/Title";
import styles from './styles.module.scss';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from '../components/Loader';
import BlockButton from "../components/HelloPage/BlockButton";
import Block from "../components/SignIn/Block";
import { useTranslation } from '../../i18n/client';

const HelloPage = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(params, 'hello-page');

  useEffect(() => {
    setTimeout(() => setLoading(true), 1000)
  }, []);

  if (!loading) return <Loader />;

  return (
    <Block className={styles.main}>
      <Container>
        <Block className={styles.content}>
          <BlockLogo>
          <HelloImage></HelloImage>
          <LogoImage></LogoImage>
          </BlockLogo>
          <BlockTitle>
          <Title>{t('title')} <br /> {t('titleWith')}</Title>
          <Description>
            {t('description')}
            <br />
            {t('descriptionWith')}
          </Description>
          </BlockTitle>
          <BlockButton>
          <Button onClick={() => router.push('/signup')}>{t('signUp')}</Button>
          <ButtonIn onClick={() => router.push('/sign-in')}>{t('signIn')}</ButtonIn>
          </BlockButton>
          <Link className={styles['none-registration']} href='/'>{t('regist')}</Link>
        </Block>
      </Container>
    </Block>
  )
}

export default HelloPage;