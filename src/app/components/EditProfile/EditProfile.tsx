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
  .required('Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
  .min(8, 'Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
  .max(30, 'Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
  .matches(
    /^(?=.*[a-z])(?=.*\d)(?=.*[_@+.\-*$£€&!?:;,~^#(){}[\]|\/\\'"])/,
    'Password must be 8-30 characters and a combination of numbers, letters and special symbols.'
  ),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match. Please re-enter your password.')
    .required('Required'),
  about: Yup.string()
    .min(10, 'This field must contain at least 10 characters')
    .max(255, 'This field must contain less than 255 characters')
    .required('Please enter a few words about you')

});



const EditProfile = () => {

    const {UserData} = User;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
 
    
    const [date, setDate] = useState(UserData.birthday);
    const [open, setOpen] = useState(false);
    const [openGen, setOpenGen] = useState(false);
    const [language, setLanguage] = useState("UKR");
    const [gender, setGender] = useState(UserData.gender);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
      initialValues: {
        username: UserData.username || '',
        email: UserData.email || '',
        birthday: date || '',
        gender: gender || '',
        password: '',
        passwordRepeat: '',
        about: UserData.about || ''
      },
        validationSchema: SignupSchema,
        onSubmit: async (values, action) => {
          const updatedValues = {
            ...values,
            gender: gender, 
          };
    
          console.log(updatedValues);
          action.resetForm();
          
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
        console.log("Modal open btn");
        
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

        <label className={styles.fieldLabel} htmlFor="gender">
            Gender
        </label>
        <div className={styles.customSelectContainer}>
            <div className={openGen ? styles.customSelectOpen : styles.customSelect} onClick={() => setOpenGen(!openGen)}>
            {!openGen ? (
                <span className={styles.options}>{gender}</span>
            ) : (
                <div className={styles.options2}>
                <div className={styles.options2} onClick={() => handleSelectGenderChange('Male')}>
                    Male
                </div>
                <div className={styles.options2} onClick={() => handleSelectGenderChange('Female')}>
                    Female
                </div>
                <div className={styles.options2} onClick={() => handleSelectGenderChange('Other')}>
                    Other
                </div>
                </div>
            )}
            </div>
        </div>

        <label className={styles.fieldLabel} htmlFor="language">
            Language
        </label>
        <div className={styles.customSelectContainer}>
            <div className={open ? styles.customSelectOpen : styles.customSelect} onClick={() => setOpen(!open)}>
            {!open ? (
                <span className={styles.options}>{language}</span>
            ) : (
                <div className={styles.options2}>
                <div className={styles.options2} onClick={() => handleSelectChange('ENG')}>
                    ENG
                </div>
                <div className={styles.options2} onClick={() => handleSelectChange('UKR')}>
                    UKR
                </div>
                </div>
            )}
            </div>
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
  <Navbar style={{ position: 'static', transform: "none", marginTop:' 23px'}} /> 
  </>
  )
}

export default EditProfile