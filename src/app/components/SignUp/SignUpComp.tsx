"use client"
import React, { useEffect } from 'react'
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
import { useFormik } from 'formik';


const SignupSchema = Yup.object().shape({
  email: Yup.string()
  .email('Please enter a valid email address.')
  .matches(
    /^[-?\w.?%?]+@\w+.{1}\w{2,4}$/,
    'Please enter a valid email address.'
  )
  .min(5, 'Email should be at least 5 characters')
  .max(50, 'Email should not exceed 50 characters')
  .required('Required'),
  password: Yup.string()
  .required('Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
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

  const formik = useFormik({
          initialValues:{
            email: '',
            password: '',
            passwordRepeat: '',
          },
          validationSchema: SignupSchema,
          onSubmit: async (values, action) => {
            console.log(values);
            
          }
        })
  const [showPassword, setShowPassword] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  
 
  return (
    <>
    <Container>
    <TogleBtn/>

  <h2 className={styles.head}>Create new account</h2>


          <form className={styles.imputForm} onSubmit={formik.handleSubmit}>
            <label className={styles.fieldLabel} htmlFor="email">Email</label>
            <input className={!formik.touched.email || !formik.errors.email ? styles.field : styles.fieldErr} 
            id="email" 
            name="email" 
            placeholder="Please enter your email address" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email && (
          <span className={styles.errMes}>{formik.errors.email}</span>
        )}
             
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
            <input className={!formik.touched.password || !formik.errors.password ? styles.field : styles.fieldErr}
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              title="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            >
              
            </input>

            { !formik.touched.password && !formik.errors.password && (<span className={styles.passText}>Password must be 8-30 characters and a combination of numbers, letters, and special symbols.
            </span>
              )}

          {formik.touched.password && formik.errors.password && (
          <span className={styles.errMes}>{formik.errors.password}</span>
            )}

     

            <label className={styles.fieldLabel} htmlFor="passwordRepeat">
                Confirm password
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Image className={styles.icon} src={showIcon} alt="show_icon" />
                ) : (
                  <Image className={styles.icon} src={hideIcon} alt="hide_icon"  />
                )}
              </div>
            </label>
            <input className={!formik.touched.passwordRepeat || !formik.errors.passwordRepeat  ? styles.field : styles.fieldErr}
              id="passwordRepeat"
              type={showPassword ? 'text' : 'password'}
              name="passwordRepeat"
              placeholder="Confirm your password"
              title="passwordRepeat"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordRepeat}
            />

              {formik.touched.passwordRepeat && formik.errors.passwordRepeat && (
                        <span className={styles.errMes}>{formik.errors.passwordRepeat}</span>
                          )}




                  <div className={styles.checkbox}>
              
                      
                  <Image
                      onClick={() => setIsAccept(!isAccept)}
                      src={isAccept ? checkTrue : checkFalse}
                      alt="Icon"
                  />
              
                      <p className={styles.checkboxTxt}>I agree to the <a className={styles.tearms} href="">Terms & Conditions</a> and <a className={styles.tearms} href="">Privacy Policy</a></p> 
                  </div>
        
                  <div className={styles.bottomBox}>
        <button className={styles.signupBtn} type='submit' disabled={!isAccept}>SIGN UP</button>
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
        </div>

          </form>

      

    
    </Container>
    </>
  )
}

export default SignUpComp