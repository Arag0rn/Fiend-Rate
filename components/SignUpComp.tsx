"use client"
import React from 'react'
import styles from "./SignUp.module.scss"; 
import { useState } from 'react';
import Container from './Container';


const SignUpComp= () => {

  const [activeButton, setActiveButton] = useState<string>('SIGN UP');

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

    <button className={styles.signupBtn} type='submit'>SIGN UP</button>
    </Container>
    </>
  )
}

export default SignUpComp