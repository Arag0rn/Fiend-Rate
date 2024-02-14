'use client';
import React, { FC, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import Block from '../Block';
import { SignupSchema } from '@/app/containers/SignInContainer';
import styles from '../../../containers/SignInContainer/styles.module.scss';
import { useRouter } from 'next/navigation';
import Label from '../Label';
import { transform } from 'next/dist/build/swc';
import CheckEmail from '../CheckEmail';

type Props = {
  setModalIcon: (value: boolean) => void,
  modalIcon: boolean,
}

const Restore: FC<Props> = ( { modalIcon, setModalIcon } ) => {
  const [check, setCheck] = useState(true);
  const router = useRouter();

  return (
    <>
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
            <Label className={styles.fieldLabel} htmlFor="email">
              Email
            </Label>
            <Field
              className={styles['field-restore']}
              id="email"
              name="email"
              placeholder="Email"
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
            onClick={() => setModalIcon(true)}
          >
            RESET PASSWORD
          </ButtonSubmit>
        </Form>
      </Formik>

      {modalIcon === true && (
        <CheckEmail setModalIcon={setModalIcon} router={router} />
      )}
    </>
  )
}

export default Restore;
