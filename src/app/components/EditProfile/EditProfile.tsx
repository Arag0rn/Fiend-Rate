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


const SignupSchema = Yup.object().shape({});

const EditProfile = () => {
    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false);
    const [openGen, setOpenGen] = useState(false);
    const [language, setLanguage] = useState("UKR");
    const [gender, setGender] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues:{
            username: '',
          email: '',
          birthday: '',
          gender: '',
          password: '',
          passwordRepeat: ''
        },
        validationSchema: SignupSchema,
        onSubmit: async (values, action) => {
          console.log(values);
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

  return (
    <Container style={{ paddingBottom: "30px", overflowY: 'auto' }}>
    <h2 className={styles.editHeaad}>EditProfile</h2>

    <form className={styles.inputForm}>
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

            <button className={styles.saveBtn}>SAVE</button>

            <div className={styles.deleteBtn}>Delete my account</div>
                 
</form>

<Navbar style={{ position: 'static', transform: "none", marginTop:' 23px'}} />
    </Container> 
   
    
  )
}

export default EditProfile