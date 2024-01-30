"use client"
import React from 'react'
import { useState } from 'react';
import styles from "./SignUp.module.scss"; 

const TogleBtn = () => {
    const [activeButton, setActiveButton] = useState<string>('SIGN UP');

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
      };
    

  return (
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
  )
}

export default TogleBtn