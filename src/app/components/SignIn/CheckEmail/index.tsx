'use client';
import React, { useEffect, useState } from 'react';
import Description from '../../HelloPage/Description';
import LinkSignUp from '../LinkSignUp';
import Link from 'next/link';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import styles from './styles.module.scss';
import Block from '../Block';
import { useRouter } from 'next/navigation';
import Loader from '../../Loader';

const CheckEmail = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(true), 1000)
  }, []);

  if (!loading) return <Loader />;

  return (
    <Block className={styles.check}>
      <Block className={styles['check__position']}>
        <Block className={styles['check__desc']}>
          Please check up your email and reset <br /> your password by link
        </Block>
        <Block className={styles['check__content']}>
          <ButtonSubmit
            className={styles.signupBtn}
            type={TypeButton.BUTTON}
            disabled={false}
            onClick={() => router.push('check-email/new-password')}
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
}

export default CheckEmail;
