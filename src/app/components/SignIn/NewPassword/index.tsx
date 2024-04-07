'use client';
import React, { useState } from 'react';
import Block from '../Block';
import showIcon from "../../../images/SignUp/show_icon.svg";
import hideIcon from "../../../images/SignUp/hide_icon.svg";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Label from '../Label';
import BlockInput from '../BlockInput';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import styles from '../../../containers/SignInContainer/styles.module.scss';
import Image from 'next/image';
import { useTranslation } from '@/i18n/client';

const NewPassword = ({ lng }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation(lng, 'new-password');

  return (
    <>
      <Formik
        initialValues={{
          password: '',
        }}
        // validationSchema={SignupScheme}
        onSubmit={async (values, action) => {
        }}
      >
      <Form className={styles['imputForm-new-password']}>
          <BlockInput>
            <Label className={styles.fieldLabel} htmlFor="password">
              {t('password')}
            </Label>
            <Block className={styles["block-password"]}>
              <Field className={styles.field}
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder={t("plholdPassword")}
                title="password"
              ></Field>
            </Block>
            <Block className={styles['confirm-rule']}>
              {t('error')}
            </Block>
            <ErrorMessage className={styles.errMes} component="span" name="password" />
          </BlockInput>

          <BlockInput>
            <Label className={styles.fieldLabel} htmlFor="confirm-password">
              {t('confirm')}
            </Label>
            <Block className={styles["block-password"]}>
              <Field className={styles.field}
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                name="confirm-password"
                placeholder={t("plholdConfirm")}
                title="confirm-password"
              ></Field>

              <Block
                className={styles.icon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword
                  ? <Image className={styles.icon} src={showIcon} alt="show_icon" />
                  : <Image className={styles.icon} src={hideIcon} alt="hide_icon" />
                }
              </Block>
            </Block>
            <ErrorMessage className={styles.errMes} component="span" name="password" />
          </BlockInput>

          <Block className={styles['block-submit']}>
            <ButtonSubmit
              className={styles.signupBtn}
              type={TypeButton.SUBMIT}
              disabled={true}
            >
              {t('complete')}
            </ButtonSubmit>
          </Block>
      </Form>
      </Formik>
    </>
  )
}

export default NewPassword;
