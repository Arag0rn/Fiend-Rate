"use client"
import React, { useState } from 'react';
import styles from "./edit.module.scss"; 
import Container from '../Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import showIcon from "../../images/SignUp/show_icon.svg";
import hideIcon from "../../images/SignUp/hide_icon.svg";
import Navbar from '../NavBar/Navbar';
import User from './user.json';
import BasicModal from './DeleteModal';
import { GenderSelector } from '../Selectors/GenderSelector/GenderSelector';
import { LangSelector } from '../Selectors/LangSelector/LangSelector';
import { PrivatRote } from '../PrivateRote';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@/app/REDUX/store';
import { updateUserData } from '@/app/REDUX/Auth/operations';
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { useRouter } from 'next/navigation';



const SignupSchema = Yup.object().shape({
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
  email: Yup.string()
  .email('Please enter a valid email address.')
  .matches(
    /^[-?\w.?%?]+@\w+.{1}\w{2,4}$/,
    'Please enter a valid email address.'
  )
  .min(5, 'Email should be at least 5 characters')
  .max(50, 'Email should not exceed 50 characters')
  .required('Required'),
  password: Yup.string()
  .min(8, 'Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
  .max(30, 'Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
  .matches(
    /^(?=.*[a-z])(?=.*\d)(?=.*[_@+.\-*$£€&!?:;,~^#(){}[\]|\/\\'"])/,
    'Password must be 8-30 characters and a combination of numbers, letters and special symbols.'
  ),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match. Please re-enter your password.'),
  about: Yup.string()
    .min(10, 'This field must contain at least 10 characters')
    .max(255, 'This field must contain less than 255 characters')
    .required('Please enter a few words about you')

});

const EditProfile = () => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [open, setOpen] = useState(false);
    const [openGen, setOpenGen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch: Dispatch = useDispatch();
    const { user } = useAuth();
    const [gender, setGender] = useState(user?.gender);
    const [date, setDate] = useState(user?.birthday);
    const [language, setLanguage] = useState(user?.language);
    console.log(user);
    const router = useRouter();
    

    const formik = useFormik({
      initialValues: {
        username: user?.username || '',
        email: user?.email || '',
        birthday: user?.birthday || '',
        gender: user?.gender || '',
        password: '',
        passwordRepeat: '',
        about: user?.about || ''
      },
        validationSchema: SignupSchema,
        onSubmit: async (values, action) => {
          const updatedValues = {
            ...values,
            gender: gender, 
            language: language
          };
          dispatch(updateUserData(updatedValues));
          action.resetForm();
          router.push('/profile')
          
        }
      })

      const handleInputChange = (event) => {
        const input = event.target.value.replace(/\D/g, '');
        const formattedDate = input
          .replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1.$2.$3')
          .replace(/^(\d{2}\.\d{2})(\d{4})/, '$1.$2');
        setDate(formattedDate);
        formik.handleChange(event); 
      };

      const handleSelectChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setOpen(true);
        
      };

      const handleSelectGenderChange = (selectedGender) => {
        setGender(selectedGender);
        setOpenGen(true);
        
      };

      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

  return (
    <>
    <Container style={{ paddingBottom: "30px", overflowY: 'auto' }}>
    <h2 className={styles.editHeaad}>Edit</h2>

    <form className={styles.inputForm} onSubmit={formik.handleSubmit}>
        <label className={styles.fieldLabelM32} htmlFor="username">
            Username
        </label>
        <input
            className={styles.field}
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
        />

{formik.touched.username && formik.errors.username && (
          <span className={styles.errMes}>{formik.errors.username}</span>
        )}

        <label className={styles.fieldLabelM32} htmlFor="email">
            Email
        </label>
        <input
            className={!formik.touched.email || !formik.errors.email ? styles.field : styles.fieldErr}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
        />

{formik.touched.email && formik.errors.email && (
          <span className={styles.errMes}>{formik.errors.email}</span>
        )}

        <label className={styles.fieldLabelM32} htmlFor="birthday">
            Birthday
        </label>
        <input
            className={!formik.touched.birthday || !formik.errors.birthday ? styles.field : styles.fieldErr}
            id="birthday"
            name="birthday"
            type="text"
            maxLength={10}
            value={date}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
        />

{formik.touched.birthday && formik.errors.birthday && (
          <span className={styles.errMes}>{formik.errors.birthday}</span>
        )}
      <div className={styles.genderLangBox}>
      <GenderSelector onSelectGender={handleSelectGenderChange} userGender={gender}/>
      <LangSelector onSelectLanguage={handleSelectChange} userLanguage={language}/>
      </div>
        <label className={styles.fieldLabel} htmlFor="password">
              Password
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Image  className={styles.icon} src={showIcon} alt="show_icon"  />
                ) : (
                  <Image className={styles.icon} src={hideIcon} alt="hide_icon"  />
                )}
              </div>
            </label>
            <input className={!formik.touched.password || !formik.errors.password ? styles.field : styles.fieldErr}
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              title="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            >
              
            </input>

          {formik.touched.password && formik.errors.password && (
          <span className={styles.errMes}>{formik.errors.password}</span>
            )}

            <label className={styles.fieldLabel} htmlFor="passwordRepeat">
                Confirm password
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Image className={styles.icon} src={showIcon} alt="show_icon" />
                ) : (
                  <Image className={styles.icon} src={hideIcon} alt="hide_icon"  />
                )}
              </div>
            </label>
            <input className={!formik.touched.passwordRepeat || !formik.errors.passwordRepeat  ? styles.field : styles.fieldErr}
              id="passwordRepeat"
              type={showPassword ? 'text' : 'password'}
              name="passwordRepeat"
              placeholder="Confirm your password"
              title="passwordRepeat"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordRepeat}
              
            />

              {formik.touched.passwordRepeat && formik.errors.passwordRepeat && (
                        <span className={styles.errMes}>{formik.errors.passwordRepeat}</span>
                          )}

            <label className={styles.fieldLabelM32} htmlFor="about">
            About
            </label>
            <textarea
                className={!formik.touched.about || !formik.errors.about ? styles.field : styles.fieldErr}
                id="about"
                name="about"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about}
                rows={4} 
                cols={50} 
            />
            {formik.touched.about && formik.errors.about && (
          <span className={styles.errMes}>{formik.errors.about}</span>
        )}


            <button type='submit' className={styles.saveBtn}>SAVE</button>

            <div className={styles.deleteBtn} onClick={handleOpenModal}>Delete my account</div>
            <BasicModal
                openModal={isModalOpen}
                handleCloseModal={handleCloseModal}
                modalTitle="Text in a modal"
                modalContent="Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
              />
                 
</form>


    </Container> 
  <Navbar style={{ position: 'fixed'}} /> 
  </>
  )
}

export default PrivatRote(EditProfile);