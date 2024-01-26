"use client"
import styles from "./SignInComp.module.scss";
import { useState } from 'react';
import Container from '../Container';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import showIcon from "../../images/SignUp/show_icon.svg";
import hideIcon from "../../images/SignUp/hide_icon.svg";
import checkFalse from "../../images/SignUp/checkFalse.svg";
import checkTrue from "../../images/SignUp/checkTrue.svg";
import facebook from "../../images/SignUp/FB.svg";
import Google from "../../images/SignUp/Google.svg";
import Description from "../HelloPage/Description/page";


const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[-?\w.?%?]+@\w+.{1}\w{2,4}$/,
      'Enter a valid email. For example user@gmail.com'
    )
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(48, 'Too Long!')
    .matches(/[a-zA-Z]/, 'Must contain at least one letter')
    .required('Required'),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});


const SignInComp = () => {

  const [activeButton, setActiveButton] = useState<string>('SIGN IN');
  const [showPassword, setShowPassword] = useState(false);
  const [isAccept, setIsAccept] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };


  return (
    <>
    <Container>
      <div className={styles.btnBox}>
        <button
            className={` ${activeButton === 'SIGN IN' ? styles.smallButton2 : styles.secondaryButton2}`}
            onClick={() => handleButtonClick('SIGN IN')}
          >
            SIGN IN
        </button>
        <button
            className={` ${activeButton === 'SIGN UP' ? styles.smallButton1 : styles.secondaryButton}`}
            onClick={() => handleButtonClick('SIGN UP')}
          >
            SIGN UP
          </button>
      </div>

      <h2 className={styles.head}>Welcome back!</h2>
      <Description>
        Please, enter your email or username and password
      </Description>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, action) => {
      
          }}
        >
          <Form className={styles.imputForm}>
            <label className={styles.fieldLabel} htmlFor="email">Email/Username</label>
            <Field className={styles.field} id="email" name="email" placeholder="Email/Username" />
            <ErrorMessage className={styles.errMes} component="span" name="email" />

            <label className={styles.fieldLabel} htmlFor="password">
              Password
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Image className={styles.icon} src={showIcon} alt="show_icon"  />
                ) : (
                  <Image className={styles.icon} src={hideIcon} alt="hide_icon"  />
                )}
              </div>
            </label>
            <Field className={styles.field}
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              title="password"
            >
              
            </Field>

            <ErrorMessage className={styles.errMes} component="span" name="password" />

            <button className={styles.signupBtn} type='submit' disabled={!isAccept}>CONTINUE</button>
          </Form>
        </Formik>

        <div className={styles.signInTxt}>or Sign in with</div>

        <div className={styles.socialBox}>
          <a className={styles.socialIcon}>
          <Image
            src={facebook}
            alt="facebook"
          />
          <p className={styles.socialTxt}>Facebook</p>
          </a>
          <a className={styles.socialIcon}>
            <Image
              src={Google}
              alt="Google"
            />
            <p className={styles.socialTxt}>Google</p>
          </a>

        </div>

        <p className={styles.bottomTxt}>Don’t have an account? <span className={styles.socialTxt}>Sign up!</span></p>
        {/* <div className={styles.bottomLine}></div> */}
    </Container>
    </>
  )
}

export default SignInComp;
