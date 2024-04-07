
import { useState } from "react";
import styles from './LangSelector.module.scss';

export const  LangSelector = ({ onSelectLanguage }) => {
    const [language, setLanguage] = useState("UKR");
    const [open, setOpen] = useState(false);

    const handleSelectChange = (newLanguage) => {
        setLanguage(newLanguage);
        setOpen(false); 
        onSelectLanguage(newLanguage);
    };
  return (
    <>
      <label className={styles.fieldLabel} htmlFor="language">
            Language
            </label>
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
    </>
  )
}
