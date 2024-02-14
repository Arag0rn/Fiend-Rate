'use client';
import React, { FC } from 'react';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import Block from '../Block';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import styles from '../../../containers/SignInContainer/styles.module.scss';

type Props = {
  setModalIcon: (value: boolean) => void,
  router: AppRouterInstance,
}

const CheckEmail: FC<Props> = ({ setModalIcon, router }) => {

  return (
    <Block className={styles.check} onClick={() => setModalIcon(false)}>
      <Block className={styles['check__content']}>
        <Block className={styles['check__desc']}>
          Please check up your email and reset <br /> your password by link
        </Block>
        <ButtonSubmit
          className={styles.signupBtn}
          type={TypeButton.BUTTON}
          disabled={false}
          onClick={() => router.push('/sign-in/restore/new-password')}
        >
          OK
        </ButtonSubmit>
      </Block>
    </Block>
  )
}

export default CheckEmail;
