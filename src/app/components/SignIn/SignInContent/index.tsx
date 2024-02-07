import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import styles from '../../../containers/SignInContainer/styles.module.scss';
import BlockInput from '../BlockInput';
import Label from '../Label';
import Block from '../Block';
import Image from 'next/image';
import showIcon from "../../../images/SignUp/show_icon.svg";
import hideIcon from "../../../images/SignUp/hide_icon.svg";
import cross from '../../../images/SignUp/cross.svg';
import Link from 'next/link';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import { FormValue, SignupSchema } from '@/app/containers/SignInContainer';

type Props = {
  showPassword: boolean,
  setRedirect: (value: boolean) => void,
  setShowPassword: (value: boolean) => void,
}

const SignInContent: FC<Props> = ({ showPassword, setRedirect, setShowPassword }) => {
  return (
    <>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values: FormValue, action) => {

          }}
        >
          {({ errors, values }) => (
          <Form className={styles.imputForm}>
            <BlockInput>
              <Label className={styles.fieldLabel} htmlFor="email">Email/Username</Label>
              <Field
                className={styles.field}
                id="email"
                name="email"
                placeholder="Email/Username"
              />
              <ErrorMessage className={styles.errMes} component="span" name="email" />
            </BlockInput>

            <BlockInput>
              <Label className={styles.fieldLabel} htmlFor="password">
                Password
              </Label>
              <Block className={styles["block-password"]}>
                <Field className={errors.password ? styles.errorPasword : styles.field}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  title="password"
                ></Field>
                {errors.password
                  ? <Block
                  className={styles.icon}
                >
                  <Image className={styles.icon} src={cross} alt="show_icon" />
                </Block>
                  :
                <Block
                  className={styles.icon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                    <Image className={styles.icon} src={showIcon} alt="show_icon" />
                  ) : (
                    <Image className={styles.icon} src={hideIcon} alt="hide_icon" />
                  )}
                </Block>
                }
              </Block>
              {errors.password ? (
                <div className={styles["reset"]}>
                    {errors.password}. <Link
                    onClick={() => setRedirect(true)}
                    className={styles["reset__link"]}
                    href={"sign-in/restore"}
                  >
                    Try to reset your <br /> password first
                  </Link>
                </div>
              ) : (
                <Link className={styles.forgetPassword} href={'sign-in/restore'}>Forgot your password?</Link>
              )}
            </BlockInput>

            <ButtonSubmit
              className={styles.signupBtn}
              type={TypeButton.SUBMIT}
              disabled={!values.email || !values.password}
            >
              CONTINUE
            </ButtonSubmit>
          </Form>
          )}
        </Formik>
    </>
  )
}

export default SignInContent