import React from 'react';
import styles from './verify.module.scss';
import Container from '../Container';

const VerifyEmail = () => {
  return (
    <Container>
    <h2 className={styles.head}>Verify your email</h2>
    <p className={styles.subHead}>Please check up your email and confirm the message to complete the registration</p>

    <button className={styles.resentBtn}>RESENT EMAIL</button>
    <div className={styles.bottomLine}></div>
    </Container>
  )
}

export default VerifyEmail