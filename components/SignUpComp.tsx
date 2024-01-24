import React from 'react'
import styles from "./SignUp.module.scss"; 


const SignUpComp= () => {
  return (
    <>
    <h1 className={styles.head}>
        Hello I am SignUp page
    </h1>

    <button className={styles.signupBtn} type='submit'>SIGN UP</button>
    </>
  )
}

export default SignUpComp