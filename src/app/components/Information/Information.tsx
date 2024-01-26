"use client"
import React from 'react';
import TogleBtn from '../SignUp/TogleBtn';
import Container from '../Container';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from "./information.module.scss"; 
import male from "../../images/Information/Male.svg";
import female from "../../images/Information/Female.svg";
import other from "../../images/Information/Other.svg";
import Image from 'next/image';

interface FormValues {
  username: string;
  birthday: string;

}

const Information = () => {
  return (
    <Container>
      <TogleBtn />
      <h2 className={styles.infoHead}>We need to know about you a little bit more</h2>

      <Formik
        initialValues={{
          username: '',
          birthday: '',
        }}
        onSubmit={async (values, action) => {
            
        }}
      >
        <Form className={styles.imputForm}>
          <label className={styles.fieldLabel} htmlFor="username">Username</label>
          <Field className={styles.field} id="username" name="username" placeholder="Please enter your username" />
          <ErrorMessage className={styles.errMes} component="span" name="username" />

          <label className={styles.fieldLabel} htmlFor="birthday">Birthday</label>
          <Field className={styles.field} id="birthday" name="birthday" placeholder="DD.MM.YYYY" />
          <ErrorMessage className={styles.errMes} component="span" name="birthday" />

          <ul className={styles.genderBox}>
        <p className={styles.boxTxt}>Gender</p>
         <li className={styles.genderItem}>
          <Image
            src={male}
            alt="male"
          />
          <p className={styles.genderTxt}>male</p>
        </li>

        <li className={styles.genderItem}>
          <Image
            src={female}
            alt="female"
          />
          <p className={styles.genderTxt}>female</p>
        </li>
        <li className={styles.genderItem}>
          <Image
            src={other}
            alt="other"
          />
          <p className={styles.genderTxt}>other</p>
        </li>
      </ul>

          
          <button className={styles.continueBtn} type="submit" disabled={true}>CREATE ACCOUNT</button>
        </Form>
      </Formik>

   
      <div className={styles.bottomLine}></div>
    </Container>
  );
};

export default Information;