'use client';
import React, { useState } from 'react';
import Description from '../../HelloPage/Description/page';
import LinkSignUp from '../LinkSignUp';
import Link from 'next/link';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import styles from './styles.module.scss';
import Block from '../Block';
import NewPassword from '../NewPassword';

const CheckEmail = () => {
  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <>
      {isConfirm === false
        ? (
          <Block className={styles.check}>
          <Block className={styles['check__position']}>
            <Description>
              Please check up your email and reset <br /> your password by link
            </Description>
            <Block className={styles['check__content']}>
              <ButtonSubmit
                className={styles.signupBtn}
                type={TypeButton.BUTTON}
                disabled={false}
                onClick={() => setIsConfirm(true)}
              >
                MAIN
              </ButtonSubmit>
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
            </Block>
          </Block>
        </Block>
        )
        : <NewPassword />
      }
    </>
  )
}

export default CheckEmail;
