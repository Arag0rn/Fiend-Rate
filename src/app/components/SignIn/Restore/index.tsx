'use client';
import React, { FC, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import Block from '../Block';
import styles from '../../../containers/SignInContainer/styles.module.scss';
import { useRouter } from 'next/navigation';
import Label from '../Label';
import { transform } from 'next/dist/build/swc';
import CheckEmail from '../CheckEmail';
import { UseTranslationResponse } from 'react-i18next';
import * as Yup from 'yup';

type Props = {
  setModalIcon: (value: boolean) => void,
  useTranslation: (lng: string, ns: string, obj?: any) => UseTranslationResponse<string, undefined>,
  lng: any,
  modalIcon: boolean,
}

const Restore: FC<Props> = ( { modalIcon, setModalIcon, useTranslation, lng } ) => {
  const [check, setCheck] = useState(true);
  const router = useRouter();
  const { t } = useTranslation(lng, 'restorePassword');

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address').required('Required'),
    password: Yup.string()
      .matches(/[a-zA-Z]/, 'Try to reset your password first',)
      .required('Incorrect username or password'),
  });

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
              {t('email')}
            </Label>
            <Field
              className={styles['field-restore']}
              id="email"
              name="email"
              placeholder={t('email')}
            />
            <ErrorMessage className={styles.errMes} component="span" name="email" />
          </Block>
          <Block className={styles['button-bottom']}>
            {t('description')}
          </Block>

          <ButtonSubmit
            className={styles.signupBtn}
            type={TypeButton.SUBMIT}
            disabled={false}
            onClick={() => setModalIcon(true)}
          >
            {t('btn')}
          </ButtonSubmit>
        </Form>
      </Formik>

      {modalIcon === true && (
        <CheckEmail
          setModalIcon={setModalIcon}
          useTranslation={useTranslation}
          router={router}
          lng={lng}
      />
      )}
    </>
  )
}

export default Restore;
