"use client"
import React, { useState } from 'react';
import Navbar from '../NavBar/Navbar';
import MainImg from '../../images/Main/mainimg.png'
import Logo from '../../images/Main/Logo.svg'
import styles from "./Main.module.scss"; 
import SelectStyles from "../EditProfile/edit.module.scss"; 
import Image from 'next/image';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import theme from './MuiThemeProvider';

export const Main = ({params}) => {

    const [value, setValue] = useState<number[]>([18, 55]);
    const [gender, setGender] = useState('Male');
    const [language, setLanguage] = useState("UKR");
    const [open, setOpen] = useState(false);
    const [openGen, setOpenGen] = useState(false);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };

      const handleSelectGenderChange = (selectedGender) => {
        setGender(selectedGender);
        setOpenGen(true);
        
      };

      const handleSelectChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setOpen(true);
        
      };

  return (
    <>
    <div className={styles.container}>
    <Image className={styles.mainLogo}
          src={Logo}
          width={80}
          quality={100}
          priority={true}
          alt='Main page image'
        />
      <Image className={styles.mainImage}
          src={MainImg}
          width={108}
          height={79}
          quality={100}
          priority={true}
          alt='Main page image'
        />
    <div className={styles.mainTxt}>SELECT THE PARAMETERS OF WHO WE WILL SEARCH FOR</div>

    <div className={styles.customSelectContainer}>
        <label className={SelectStyles.fieldLabel} htmlFor="gender">
            Gender
        </label>
            <div className={openGen ? SelectStyles.customSelectOpen : SelectStyles.customSelect} onClick={() => setOpenGen(!openGen)}>
            {!openGen ? (
                <span className={SelectStyles.options}>{gender}</span>
            ) : (
                <div className={SelectStyles.options2}>
                <div className={SelectStyles.options2} onClick={() => handleSelectGenderChange('Male')}>
                    Male
                </div>
                <div className={SelectStyles.options2} onClick={() => handleSelectGenderChange('Female')}>
                    Female
                </div>
                <div className={SelectStyles.options2} onClick={() => handleSelectGenderChange('Other')}>
                    Other
                </div>
                </div>
            )}
            </div>
            
            <label className={SelectStyles.fieldLabel} htmlFor="language">
            Language
            </label>
            <div className={open ? SelectStyles.customSelectOpen : SelectStyles.customSelect} onClick={() => setOpen(!open)}>
            {!open ? (
                <span className={SelectStyles.options}>{language}</span>
            ) : (
                <div className={SelectStyles.options2}>
                <div className={SelectStyles.options2} onClick={() => handleSelectChange('ENG')}>
                    ENG
                </div>
                <div className={SelectStyles.options2} onClick={() => handleSelectChange('UKR')}>
                    UKR
                </div>
                </div>
            )}
            </div>
    </div>

    <ThemeProvider theme={theme}>
    <Box sx={{ 
      '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        backgroundColor: 'unset',
        color: 'white',
       
      },
      width: 300,
      color: 'primary.main',
      marginTop: '55px'
    }}>
      <Slider
        value={value} 
        onChange={handleChange}
        valueLabelDisplay="on"
      />
    </Box>
    </ThemeProvider>
    <div className={styles.mainBtnBox}>
      <button className={styles.button1to1}>1 TO 1</button>
      <button className={styles.buttonGroup}>GROUP</button>
    </div>
    <Navbar/>
    </div>
    </>
  )
}
