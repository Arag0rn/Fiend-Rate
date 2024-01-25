"use client"
import React from 'react'
import styles from "./SignUp.module.scss"; 
import { useState } from 'react';
import Container from '../Container';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import showIcon from "../../public/images/SignUp/show_icon.svg";
import hideIcon from "../../public/images/SignUp/hide_icon.svg";
import checkFalse from "../../public/images/SignUp/checkFalse.svg";
import checkTrue from "../../public/images/SignUp/checkTrue.svg";
import facebook from "../../public/images/SignUp/FB.svg";
import Google from "../../public/images/SignUp/Google.svg";


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
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});


const SignUpComp= () => {

  const [activeButton, setActiveButton] = useState<string>('SIGN UP');
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
          className={` ${activeButton === 'SIGN UP' ? styles.smallButton1 : styles.secondaryButton}`}
          onClick={() => handleButtonClick('SIGN UP')}
        >
          SIGN UP
        </button>
        <button
          className={` ${activeButton === 'SIGN IN' ? styles.smallButton2 : styles.secondaryButton2}`}
          onClick={() => handleButtonClick('SIGN IN')}
        >
          SIGN IN
      </button>

  </div>

  <h2 className={styles.head}>Create new account</h2>

  <Formik
          initialValues={{
            email: '',
            password: '',
            passwordRepeat: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, action) => {
      
          }}
        >
          <Form className={styles.imputForm}>
            <label className={styles.fieldLabel} htmlFor="email">Email</label>
            <Field className={styles.field} id="email" name="email" placeholder="Please enter your email address" />
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

            <label className={styles.fieldLabel} htmlFor="passwordRepeat">
              Repeat password
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Image className={styles.icon} src={showIcon} alt="show_icon" />
                ) : (
                  <Image className={styles.icon} src={hideIcon} alt="hide_icon"  />
                )}
              </div>
            </label>
            <Field className={styles.field}
              id="passwordRepeat"
              type={showPassword ? 'text' : 'password'}
              name="passwordRepeat"
              placeholder="Confirm your password"
              title="passwordRepeat"
            />

            <ErrorMessage className={styles.errMes} component="span" name="passwordRepeat" />


                  <div className={styles.checkbox}>
              
                      
                  <Image
                      onClick={() => setIsAccept(!isAccept)}
                      src={isAccept ? checkTrue : checkFalse}
                      alt="Icon"
                  />
              
                      <p className={styles.checkboxTxt}>I agree to the Terms & Conditions and Privacy Policy</p> 
                  </div>
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

        <p className={styles.bottomTxt}>Already have an account? <span className={styles.socialTxt}>Sign in!</span></p>
        <div className={styles.bottomLine}></div>

    
    </Container>
    </>
  )
}

export default SignUpComp