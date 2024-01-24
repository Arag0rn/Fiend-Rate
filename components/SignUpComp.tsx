"use client"
import React from 'react'
import styles from "./SignUp.module.scss"; 
import { useState } from 'react';
import Container from './Container';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { ReactComponent as ShowIcon } from "./show_icon.svg";

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
          className={` ${activeButton === 'SIGN IN' ? styles.smallButton2 : styles.secondaryButton}`}
          onClick={() => handleButtonClick('SIGN IN')}
        >
          SIGN IN
      </button>

  </div>

  <h2>Create new account</h2>

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
          <Form>
            <label htmlFor="email">Enter your email</label>
            <Field id="email" name="email" placeholder="E-mail" />
            <ErrorMessage component="span" name="email" />

            <label htmlFor="password">
              Enter your password
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Image src="./show_icon.svg" alt="Logo" width={18} height={18} />
                ) : (
                  <Image src="./hide_icon.svg" alt="Logo" width={18} height={18} />
                )}
              </button>
            </label>
            <Field
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              title="password"
            />

            <ErrorMessage component="span" name="password" />

            <label htmlFor="passwordRepeat">
              Repeat password
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Image src="./show_icon.svg" alt="Logo" width={18} height={18} />
                ) : (
                  <Image src="./hide_icon.svg" alt="Logo" width={18} height={18} />
                )}
              </button>
            </label>
            <Field
              id="passwordRepeat"
              type={showPassword ? 'text' : 'password'}
              name="passwordRepeat"
              placeholder="Repeat password"
              title="passwordRepeat"
            />

            <ErrorMessage component="span" name="passwordRepeat" />
          

            <button className={styles.signupBtn} type='submit'>SIGN UP</button>
          </Form>
        </Formik>

    
    </Container>
    </>
  )
}

export default SignUpComp