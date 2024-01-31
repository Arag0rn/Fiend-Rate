'use client';
import React, { useState } from 'react'
import Block from '../Block';
import BlockContent from '../BlockContent';
import showIcon from "../../../images/SignUp/show_icon.svg";
import hideIcon from "../../../images/SignUp/hide_icon.svg";
import BlockToggle from '../BlockToogle';
import ButtonToggle from '../ButtonToggle';
import TitleSignIn from '../TitleSignIn';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Label from '../Label';
import BlockInput from '../BlockInput';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import styles from './styles.module.scss';
import Image from 'next/image';

const NewPassword = () => {
  const [activeButton, setActiveButton] = useState<string>('SIGN IN');
  const [showPassword, setShowPassword] = useState(false);
  const [isAccept, setIsAccept] = useState(true);

  return (
    <Block className={styles["block"]}>
      <BlockContent>
        <BlockToggle>
          <ButtonToggle
            className={`${activeButton === 'SIGN UP'
            ? styles.smallButton1
            : styles.secondaryButton}`}
            onClick={() => setActiveButton('SIGN UP')}
          >
            SIGN UP
          </ButtonToggle>

          <ButtonToggle
            className={`${activeButton === 'SIGN IN'
            ? styles.smallButton2
            : styles.secondaryButton2}`}
            onClick={() => setActiveButton('SIGN IN')}
          >
            SIGN IN
          </ButtonToggle>
        </BlockToggle>
        <TitleSignIn className={styles.head}>Set new password</TitleSignIn>
        <Block className={styles.description}>
          Please, set a strong password
        </Block>
      </BlockContent>

      <Formik
        initialValues={{
          password: '',
        }}
        // validationSchema={SignupScheme}
        onSubmit={async (values, action) => {
        }}
      >
      <Form className={styles.imputForm}>
          <BlockInput>
            <Label className={styles.fieldLabel} htmlFor="password">
              Password
            </Label>
            <Block className={styles["block-password"]}>
              <Field className={styles.field}
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                title="password"
              ></Field>
            </Block>
              <ErrorMessage className={styles.errMes} component="span" name="password" />
          </BlockInput>

          <BlockInput>
            <Label className={styles.fieldLabel} htmlFor="confirm-password">
              Confirm password
            </Label>
            <Block className={styles["block-password"]}>
              <Field className={styles.field}
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                title="password"
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

          <Block className={styles['confirm-rule']}>
            Password must be 8-30 characters and a combination of numbers <br /> and letters
          </Block>

          <Block className={styles['block-submit']}>
            <ButtonSubmit
              className={styles.signupBtn}
              type={TypeButton.SUBMIT}
              disabled={false}
            >
              CONTINUE
            </ButtonSubmit>
          </Block>
      </Form>
      </Formik>
    </Block>
  )
}

export default NewPassword;
