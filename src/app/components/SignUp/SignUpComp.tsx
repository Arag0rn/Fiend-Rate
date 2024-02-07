"use client"
import React from 'react'
import styles from "./SignUp.module.scss"; 
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
import TogleBtn from './TogleBtn';
import Link from 'next/link';


const SignupSchema = Yup.object().shape({
  email: Yup.string()
  .email('Invalid email address')
  .matches(
    /^[-?\w.?%?]+@\w+.{1}\w{2,4}$/,
    'Please enter a valid email address.'
  )
  .min(5, 'Email should be at least 5 characters')
  .max(50, 'Email should not exceed 50 characters')
  .required('Required'),
  password: Yup.string()
  .required('Password is required')
  .min(8, 'Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
  .max(30, 'Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
  .matches(
    /^(?=.*[a-z])(?=.*\d)(?=.*[_@+.\-*$£€&!?:;,~^#(){}[\]|\/\\'"])/,
    'Password must be 8-30 characters and a combination of numbers, letters and special symbols.'
  ),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match. Please re-enter your password.')
    .required('Required'),
});


const SignUpComp= () => {


  const [showPassword, setShowPassword] = useState(false);
  const [isAccept, setIsAccept] = useState(false);



  return (
    <>
    <Container>
    <TogleBtn/>

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
                  <Image  className={styles.icon} src={showIcon} alt="show_icon"  />
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

        <p className={styles.bottomTxt}>Already have an account? 
            <Link className={styles.socialTxt} href="/sign-in">
              Sign in!
            </Link>
        </p>


    
    </Container>
    </>
  )
}

export default SignUpComp