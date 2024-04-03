"use client"
import { useState } from "react";
import styles from './GenderSelector.module.scss';

export const GenderSelector = ({ onSelectGender }) => {

    const [openGen, setOpenGen] = useState(false);
    const [gender, setGender] = useState('Male');

    const handleSelectGenderChange = (newGender) => {
        setGender(newGender);
        setOpenGen(true);
        onSelectGender(newGender);
        
      };
  return (
    <> 
    <label className={styles.fieldLabel} htmlFor="gender">
    Gender
</label>
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
    </div></>
  )
}
