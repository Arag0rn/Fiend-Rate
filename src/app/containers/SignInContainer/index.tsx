"use client"
import styles from "./styles.module.scss";
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Image from 'next/image';
import facebook from "../../images/SignUp/FB.svg";
import Google from "../../images/SignUp/Google.svg";
import Description from "../../components/HelloPage/Description";
import ButtonToggle from "../../components/SignIn/ButtonToggle";
import BlockToggle from "../../components/SignIn/BlockToogle";
import BlockContent from "../../components/SignIn/BlockContent";
import TitleSignIn from "../../components/SignIn/TitleSignIn";
import Link from "next/link";
import SocialText from "../../components/SignIn/SocialText";
import LinkSignUp from "../../components/SignIn/LinkSignUp";
import Block from "../../components/SignIn/Block";
import SocialBlock from "../../components/SignIn/SocialBlock";
import Restore from "@/app/components/SignIn/Restore";
import Loader from '../../components/Loader';
import { useRouter, usePathname } from "next/navigation";
import Container from "@/app/components/Container";
import SignInContent from "@/app/components/SignIn/SignInContent";
import NewPassword from "@/app/components/SignIn/NewPassword";

export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[-?\w.?%?]+@\w+.{1}\w{2,4}$/,
      'Enter a valid email. For example user@gmail.com'
    )
    .required('Required'),
  password: Yup.string()
    .matches(/[a-zA-Z]/, 'Try to reset your password first',)
    .required('Incorrect username or password',),

  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export type FormValue = {
  email: string,
  password: string,
}

const SignInContainer = () => {
  const [activeButton, setActiveButton] = useState<string>('SIGN IN');
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [modalIcon, setModalIcon] = useState(false);

  useEffect(() => {
    setTimeout(() =>
    setLoading(true), 1000);
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);

    if (buttonName === 'SIGN UP') {
      router.push('/signup');
    }
  };

  if (!loading) return <Loader />;

  return (
    <Block className={styles.content}>
      <Container>
        <Block
          className={styles["content__block"]}
        >
          <BlockContent>
            <BlockToggle>
              <ButtonToggle
                className={`${activeButton === 'SIGN UP'
                ? styles.smallButton1
                : styles.secondaryButton}`}
                onClick={() => handleButtonClick('SIGN UP')}
              >
                SIGN UP
              </ButtonToggle>

              <ButtonToggle
                className={`${activeButton === 'SIGN IN'
                ? styles.smallButton2
                : styles.secondaryButton2}`}
                onClick={() => handleButtonClick('SIGN IN')}
              >
                SIGN IN
              </ButtonToggle>
            </BlockToggle>

            {pathname === '/sign-in' && (
              <TitleSignIn className={styles.head}>Welcome back!</TitleSignIn>
            )}

            {pathname === '/sign-in/restore' && (
              <TitleSignIn className={styles['head-restore']}>
                Restore Password
              </TitleSignIn>
            )}

            {pathname === '/sign-in/restore/new-password' && (
              <TitleSignIn className={styles.head}>
                Set new password
              </TitleSignIn>
            )}

            {pathname === '/sign-in' && (
              <Block className={styles.description}>
                <Description>
                  Please, enter your email or username and <br /> password
                </Description>
              </Block>
            )}

            {pathname === '/sign-in/restore' && (
              <Block className={styles['description-restore']}>
                Please, enter your email to reset <br /> your password
              </Block>
            )}

            {pathname === '/sign-in/restore/new-password' && (
              <Block className={styles['description-new-password']}>
                  Please, set a strong password
              </Block>
            )}
          </BlockContent>

          {pathname === '/sign-in' && (
            <SignInContent
              showPassword={showPassword}
              setRedirect={setRedirect}
              setShowPassword={setShowPassword}
            />
          )}

          {pathname === '/sign-in/restore' &&
            <Restore
              modalIcon={modalIcon}
              setModalIcon={setModalIcon}
            />
          }
          {pathname === '/sign-in/restore/new-password' && <NewPassword />}

          {pathname !== '/sign-in/restore/new-password' && (
            <>
            <Block className={styles.signInTxt}>
              <Block className={styles["line"]}></Block>
              <Block>or Sign in with</Block>
              <Block className={styles["line"]}></Block>
            </Block>
            <Block className={styles.flex}>
              <SocialBlock className={styles.socialBox}>
                <Link href='/' className={styles.socialIcon}>
                <Image
                  src={facebook}
                  alt="facebook"
                />
                <SocialText className={styles.socialTxt}>Facebook</SocialText>
                </Link>
                <Link href='/' className={styles.socialIcon}>
                  <Image
                    src={Google}
                    alt="Google"
                  />
                  <SocialText className={styles.socialTxt}>Google</SocialText>
                </Link>
              </SocialBlock>

              <LinkSignUp
                className={styles.bottomTxt}
              >
                Don’t have an account? <Link
                  href='/signup'
                  className={styles.socialTxt}
                >
                  Sign up!
                </Link>
              </LinkSignUp>
            </Block>
            </>
          )}
        </Block>
      </Container>
    </Block>
  )
}

export default SignInContainer;
