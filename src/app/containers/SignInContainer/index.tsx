"use client"
import styles from "./styles.module.scss";
import { useEffect, useState } from 'react';
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
import { useTranslation } from '../../../i18n/client';
import RestoreTitle from "@/app/components/SignIn/RestoreTitle";
import RestoreSubTitle from "@/app/components/SignIn/RestoreSubTitle";
import NewPasswordTitle from "@/app/components/SignIn/NewPasswordTitle";
import NewPasswordSubTitle from "@/app/components/SignIn/NewPasswordSubTitle";
import { FormikHelpers, FormikValues } from "formik";

export type FormValue = {
  email: string,
  password: string,
}

const SignInContainer = ({ lng }) => {
  const [activeButton, setActiveButton] = useState<string>('SIGN IN');
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [modalIcon, setModalIcon] = useState(false);
  const { t } = useTranslation(lng, 'sign-in');

  useEffect(() => {
    setTimeout(() =>
    setLoading(true), 1000);

    const handleAutofill = (event: Event, action?: FormikHelpers<FormikValues>) => {
      action?.setFieldValue((event.target as HTMLInputElement).name, (event.target as HTMLInputElement).value);
    }

    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
      input.addEventListener('change', handleAutofill);
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('change', handleAutofill);
      });
    }
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
                {t('signUp')}
              </ButtonToggle>

              <ButtonToggle
                className={`${activeButton === 'SIGN IN'
                ? styles.smallButton2
                : styles.secondaryButton2}`}
                onClick={() => handleButtonClick('SIGN IN')}
              >
                {t('signIn')}
              </ButtonToggle>
            </BlockToggle>

            {pathname === `/${lng}/sign-in` && (
              <TitleSignIn className={styles.head}>{t('title')}</TitleSignIn>
            )}

            {pathname === `/${lng}/sign-in/restore` && (
              <RestoreTitle styles={styles} lng={lng} />
            )}

            {pathname === `/${lng}/sign-in/restore/new-password` && (
              <NewPasswordTitle lng={lng} styles={styles}/>
            )}

            {pathname === `/${lng}/sign-in` && (
              <Block className={styles.description}>
                <Description>
                {t('subTitle')}
                </Description>
              </Block>
            )}

            {pathname === `/${lng}/sign-in/restore` && (
              <RestoreSubTitle styles={styles} lng={lng} />
            )}

            {pathname === `/${lng}/sign-in/restore/new-password` && (
              <NewPasswordSubTitle lng={lng} styles={styles} />
            )}
          </BlockContent>

          {pathname === `/${lng}/sign-in` && (
            <SignInContent
              showPassword={showPassword}
              setRedirect={setRedirect}
              setShowPassword={setShowPassword}
              lng={lng}
              useTranslation={useTranslation}
              setIsError={setIsError}
              isError={isError}
            />
          )}

          {pathname === `/${lng}/sign-in/restore` &&
            <Restore
              modalIcon={modalIcon}
              setModalIcon={setModalIcon}
              lng={lng}
              useTranslation={useTranslation}
            />
          }
          {pathname === `/${lng}/sign-in/restore/new-password` && <NewPassword lng={lng} />}

          {pathname !== `/${lng}/sign-in/restore/new-password` && (
            <>
            <Block className={styles.signInTxt}>
              <Block className={styles["line"]}></Block>
              <Block>{t('textSignIn')}</Block>
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
                {t('linkAccount')} <Link
                  href='/signup'
                  className={styles.socialTxt}
                >
                 {t('linkSignUp')}
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
