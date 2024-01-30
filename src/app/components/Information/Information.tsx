"use client"
import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import TogleBtn from '../SignUp/TogleBtn';
import Container from '../Container';
import styles from './information.module.scss';
import male from '../../images/Information/Male.svg';
import female from '../../images/Information/Female.svg';
import other from '../../images/Information/Other.svg';
import malePressed from '../../images/Information/MalePressed.svg';
import femalePressed from '../../images/Information/FemalePressed.svg';
import otherPressed from '../../images/Information/OtherPressed.svg';

const createAccountSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  birthday: Yup.string().required('Please enter your birthdate'),
});

const Information = () => {
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      birthday: '',
      gender: '',
    },
    validationSchema: createAccountSchema,
    onSubmit: async (values, actions) => {
  
      console.log(values);
    },
  });

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, '');
    const formattedDate = input
      .replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1.$2.$3')
      .replace(/^(\d{2}\.\d{2})(\d{4})/, '$1.$2');
    setDate(formattedDate);
    formik.handleChange(event); 
  };

  const handleOptionClick = (option) => {
    setGender((prevGender) => (prevGender === option ? '' : option));
    formik.setFieldValue('gender', option); 
  };

  return (
    <Container>
      <TogleBtn />
      <h2 className={styles.infoHead}>We need to know about you a little bit more</h2>

      <form className={styles.imputForm} onSubmit={formik.handleSubmit}>
        <label className={styles.fieldLabel} htmlFor="username">
          Username
        </label>
        <input
          className={styles.field}
          id="username"
          name="username"
          placeholder="Please enter your username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <span className={styles.errMes}>{formik.errors.username}</span>
        )}

        <label className={styles.fieldLabel} htmlFor="birthday">
          Birthday
        </label>
        <input
          className={styles.field}
          type="text"
          id="birthday"
          name="birthday"
          value={date}
          onChange={handleInputChange}
          maxLength="10"
          placeholder="DD.MM.YYYY"
          onBlur={formik.handleBlur}
        />
        {formik.touched.birthday && formik.errors.birthday && (
          <span className={styles.errMes}>{formik.errors.birthday}</span>
        )}

        <ul className={styles.genderBox}>
          <p className={styles.boxTxt}>Gender</p>
          <li className={styles.genderItem} onClick={() => handleOptionClick('male')}>
            <Image src={gender === 'male' ? malePressed : male} alt="male" />
            <p className={styles.genderTxt}>male</p>
          </li>

          <li className={styles.genderItem} onClick={() => handleOptionClick('female')}>
            <Image src={gender === 'female' ? femalePressed : female} alt="female" />
            <p className={styles.genderTxt}>female</p>
          </li>

          <li className={styles.genderItem} onClick={() => handleOptionClick('other')}>
            <Image src={gender === 'other' ? otherPressed : other} alt="other" />
            <p className={styles.genderTxt}>other</p>
          </li>
        </ul>

        <button
          className={styles.continueBtn}
          type="submit"
          disabled={!formik.isValid || !formik.dirty || !gender}
        >
          CREATE ACCOUNT
        </button>
      </form>

      <div className={styles.bottomLine}></div>
    </Container>
  );
};

export default Information;