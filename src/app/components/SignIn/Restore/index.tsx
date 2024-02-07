'use client';
import React, { useState } from 'react';
import Description from '../../HelloPage/Description';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import Block from '../Block';
import { SignupSchema } from '@/app/containers/SignInContainer';
import styles from '../../../containers/SignInContainer/styles.module.scss';
import { useRouter } from 'next/navigation';

const Restore = () => {
  const [check, setCheck] = useState(true);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      validate={values => {
        if (!values.email) {
          setCheck(false);
        }
      }}
      onSubmit={async (values, action) => {
          setCheck(true);
      }}
    >
      <Form>
        <Block className={styles['content-bottom']}>
          <Field
            className={styles.field}
            id="email"
            name="email"
            placeholder="Antonio777@gmail.com"
          />
          <ErrorMessage className={styles.errMes} component="span" name="email" />
        </Block>
        <Block className={styles['button-bottom']}>
          If your email is registered on the site,
          you will receive a <br /> password recovery link
        </Block>

        <ButtonSubmit
          className={styles.signupBtn}
          type={TypeButton.SUBMIT}
          disabled={false}
          onClick={() => router.push('restore/check-email')}
        >
          RESET PASSWORD
        </ButtonSubmit>
      </Form>
    </Formik>
  )
}

export default Restore;
