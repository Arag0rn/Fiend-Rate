'useclient';
import React, { FC, useState } from 'react';
import BlockContent from '../BlockContent';
import BlockToggle from '../BlockToogle';
import ButtonToggle from '../ButtonToggle';
import TitleSignIn from '../TitleSignIn';
import Description from '../../HelloPage/Description/page';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import Block from '../Block';
import SocialBlock from '../SocialBlock';
import Link from 'next/link';
import SocialText from '../SocialText';
import Image from 'next/image';
import LinkSignUp from '../LinkSignUp';
import Google from "../../../images/SignUp/Google.svg";
import facebook from "../../../images/SignUp/FB.svg";
import { SignupSchema } from '@/app/containers/SignInContainer';
import styles from './styles.module.scss';
import CheckEmail from '../CheckEmail';

type Props = {
  isAccept: boolean,
  activeButton: string,
  handleButtonClick: (value: string) => void,
}

const Restore: FC<Props> = ({ isAccept, activeButton, handleButtonClick }) => {
  const [check, setCheck] = useState(true);

  return (
    <>
    {check === false
      ? (
        <Block className={styles.padding}>
          <BlockContent className={styles['content-bottom']}>
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
            <TitleSignIn className={styles.head}>Restore Password</TitleSignIn>
            <Description>
              Please, enter your email or username to reset <br /> your password
            </Description>
          </BlockContent>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            validate={values => {
              if (!values.email) {
                setCheck(false);
              }
            }}
            onSubmit={async (values, action) => {
                setCheck(true);
            }}
          >
            <Form>
              <Block className={styles['content-bottom']}>
                <Field
                  className={styles.field}
                  id="email"
                  name="email"
                  placeholder="Antonio777@gmail.com"
                />
                <ErrorMessage className={styles.errMes} component="span" name="email" />
            </Block>
              <Description>
                If your email is registered on the site,
                you will receive a <br /> password recovery link
              </Description>

              <ButtonSubmit
                className={styles.signupBtn}
                type={TypeButton.SUBMIT}
                disabled={false}
              >
                RESET PASSWORD
              </ButtonSubmit>
            </Form>
          </Formik>

          <Block className={styles.signInTxt}>
            <Block className={styles["line"]}></Block>
            <Block>or Sign in with</Block>
            <Block className={styles["line"]}></Block>
          </Block>

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
      )
      : ( <CheckEmail /> )
    }
    </>
  )
}

export default Restore;
