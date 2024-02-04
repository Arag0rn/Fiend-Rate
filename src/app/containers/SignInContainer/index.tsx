"use client"
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import showIcon from "../../images/SignUp/show_icon.svg";
import hideIcon from "../../images/SignUp/hide_icon.svg";
import cross from '../../images/SignUp/cross.svg';
import facebook from "../../images/SignUp/FB.svg";
import Google from "../../images/SignUp/Google.svg";
import Description from "../../components/HelloPage/Description";
import ButtonToggle from "../../components/SignIn/ButtonToggle";
import BlockToggle from "../../components/SignIn/BlockToogle";
import BlockContent from "../../components/SignIn/BlockContent";
import TitleSignIn from "../../components/SignIn/TitleSignIn";
import ButtonSubmit, { TypeButton } from "../../components/SignIn/ButtonSubmit";
import BlockInput from "../../components/SignIn/BlockInput";
import Link from "next/link";
import SocialText from "../../components/SignIn/SocialText";
import LinkSignUp from "../../components/SignIn/LinkSignUp";
import Block from "../../components/SignIn/Block";
import SocialBlock from "../../components/SignIn/SocialBlock";
import Label from "../../components/SignIn/Label";
import Restore from "@/app/components/SignIn/Restore";

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



const SignInContainer = () => {
  const [activeButton, setActiveButton] = useState<string>('SIGN IN');
  const [showPassword, setShowPassword] = useState(false);
  const [isAccept, setIsAccept] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <>
    {redirect === false
          ? (
      <Block className={styles["block"]}>
          <>
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
              <TitleSignIn className={styles.head}>Welcome back!</TitleSignIn>
              <Block className={styles.description}>
                <Description>
                  Please, enter your email or username and <br /> password
                </Description>
              </Block>
            </BlockContent>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values, action) => {
                setIsReset(false);
                action.resetForm;
                action.setStatus;
              }}
            >
              {({ errors, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className={styles.imputForm}>
                  <BlockInput>
                    <Label className={styles.fieldLabel} htmlFor="email">Email/Username</Label>
                    <Field
                      className={styles.field}
                      id="email"
                      name="email"
                      placeholder="Email/Username"
                    />
                    <ErrorMessage className={styles.errMes} component="span" name="email" />
                  </BlockInput>

                  <BlockInput>
                    <Label className={styles.fieldLabel} htmlFor="password">
                      Password
                    </Label>
                    <Block className={styles["block-password"]}>
                      <Field className={errors.password ? styles.errorPasword : styles.field}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        title="password"
                      ></Field>
                      {errors.password
                        ? <Block
                        className={styles.icon}
                      >
                        <Image className={styles.icon} src={cross} alt="show_icon" />
                      </Block>
                        :
                      <Block
                        className={styles.icon}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                          {showPassword ? (
                          <Image className={styles.icon} src={showIcon} alt="show_icon" />
                        ) : (
                          <Image className={styles.icon} src={hideIcon} alt="hide_icon" />
                        )}
                      </Block>
                      }
                    </Block>
                    {!errors.password && <Link className={styles.forgetPassword} href={{}}>Forgot password</Link>}
                    {errors.password ? (
                      <div className={styles["reset"]}>
                          {errors.password}. <Link
                          onClick={() => setRedirect(true)}
                          className={styles["reset__link"]}
                          href={""}
                        >
                          Try to reset your password first
                        </Link>
                      </div>
                    ) : (
                      ''
                    )}
                  </BlockInput>

                  <ButtonSubmit
                    className={styles.signupBtn}
                    type={TypeButton.SUBMIT}
                    disabled={isAccept === true ? true : false}
                  >
                    CONTINUE
                  </ButtonSubmit>
              </Form>
              )}
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
          </>
        </Block>)
      : (
          <Restore
            isAccept={isAccept}
            handleButtonClick={handleButtonClick}
            activeButton={activeButton}
          />
        )
    }
    </>
  )
}

export default SignInContainer;
