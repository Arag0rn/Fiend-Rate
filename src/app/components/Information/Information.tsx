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
import { useAppContext } from '../context';
import {register} from "../../REDUX/Auth/operations"
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/REDUX/store';

const createAccountSchema = Yup.object().shape({
  username: Yup.string()
  .min(3, 'Username must be 3-25 characters and combination of latin letters, numbers, and special symbols.')
  .max(25, 'Username must be 3-25 characters and combination of latin letters, numbers, and special symbols.')
  .matches(/^[a-zA-Z0-9]+$/, 'Username must be 3-25 characters and combination of latin letters, numbers, and special symbols.')
  .required('Username must be 3-25 characters and combination of latin letters, numbers, and special symbols.'),
  birthday: Yup.string()
  .required('Please enter your birthdate')
  .matches(
    /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(192[5-9]|19[3-9]\d|20[0-1]\d|202[0-3])$/,
    `Invalid date format: "Birthdate must be written in 'DD.MM.YYYY' format.`
  ),
});

const Information = () => {
  const { state } = useAppContext();
  const formData = state.formData;
  console.log(formData);
  
  const dispatch: AppDispatch = useDispatch();
  
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
  
      const combinedData = { ...formData, ...values };
      console.log(combinedData);
      dispatch(register(combinedData))
      actions.resetForm();
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
        <input className={!formik.touched.username || !formik.errors.username ? styles.field : styles.fieldErr}
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
        <input className={!formik.touched.birthday || !formik.errors.birthday  ? styles.field : styles.fieldErr}
          type="text"
          id="birthday"
          name="birthday"
          value={date}
          onChange={handleInputChange}
          maxLength={10}
          placeholder="DD.MM.YYYY"
          onBlur={formik.handleBlur}
        />
        {formik.touched.birthday && formik.errors.birthday && (
          <span className={styles.errMes}>{formik.errors.birthday}</span>
        )}

        <ul className={styles.genderBox}>
          <p className={styles.boxTxt}>Gender</p>
          <li className={styles.genderItem} onClick={() => handleOptionClick('M')}>
            <Image src={gender === 'M' ? malePressed : male} alt="male" />
            <p className={styles.genderTxt}>male</p>
          </li>

          <li className={styles.genderItem} onClick={() => handleOptionClick('W')}>
            <Image src={gender === 'W' ? femalePressed : female} alt="female" />
            <p className={styles.genderTxt}>female</p>
          </li>

          <li className={styles.genderItem} onClick={() => handleOptionClick('NB')}>
            <Image src={gender === 'NB' ? otherPressed : other} alt="other" />
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

    </Container>
  );
};

export default Information;