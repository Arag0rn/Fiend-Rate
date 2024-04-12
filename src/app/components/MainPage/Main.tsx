"use client"
import React, { useState } from 'react';
import Navbar from '../NavBar/Navbar';
import MainImg from '../../images/Main/mainimg.png'
import Logo from '../../images/Main/Logo.svg'
import styles from "./Main.module.scss"; 
import Image from 'next/image';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import theme from './MuiThemeProvider';
import { GenderSelector } from '../Selectors/GenderSelector/GenderSelector';
import { LangSelector } from '../Selectors/LangSelector/LangSelector';
import {  PrivateRoute } from '../PrivateRote';

const Main = ({params}) => {

    const [value, setValue] = useState<number[]>([18, 55]);
    const [selectedLanguage, setSelectedLanguage] = useState("UKR");
    const [selectedGender, setSelectedGender] = useState("Male");

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };

      const handleLanguageChange = (newLanguage: string) => {
        setSelectedLanguage(newLanguage as string);
    };

    const handleGenderChange = (newGender: string) => {
      setSelectedGender(newGender as string);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value.trim(); 
  
    if (newValue === "") {
      newValue = "1"; 
    }
  
    let parsedValue = parseInt(newValue, 10);
  
    if (isNaN(parsedValue) || parsedValue < 1) {
      parsedValue = 1; 
    } else if (parsedValue > 99) {
      parsedValue = 99; 
    }
  
    const updatedValue = [...value];
    updatedValue[index] = parsedValue;
    setValue(updatedValue);
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
      <GenderSelector onSelectGender={handleGenderChange} userGender={undefined}/>
      <LangSelector onSelectLanguage={handleLanguageChange} userLanguage={undefined}/>   
    </div>

   <div className={styles.sliderContainer}>
    <div className={styles.ageTxt}>Age</div>

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
      marginTop: '25px'
    }}>
      <Slider
        value={value} 
        onChange={handleChange}
        valueLabelDisplay="on"
        min={14} 
        max={99}
      />
    </Box>
    </ThemeProvider>
    </div>
    <div className={styles.inputContainer}>
      <input className={styles.valueInput} type="text" value={value[0]} onChange={(e) => handleInputChange(0, e)} />
      <input className={styles.valueInput} type="text" value={value[1]} onChange={(e) => handleInputChange(1, e)} />
      <button className={styles.buttonOK}>OK</button>
    </div>

    <div className={styles.mainBtnBox}>
      <button className={styles.button1to1}>1 TO 1</button>
      <button className={styles.buttonGroup}>GROUP</button>
    </div>
    <Navbar/>
    </div>
    </>
  )
}

export default PrivateRoute(Main);