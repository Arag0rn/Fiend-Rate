import React from 'react';
import styles from '../styles.module.scss';
import Image from 'next/image';

const TimerAndButtons = ({
  time,
  callEnd,
  call,
  microfonClose,
  microfon,
  formatTime
}) => {
  return (
    <div className={styles['connect__nav']}>
      <span className={styles["connect__timer"]}>{formatTime(time)}</span>
      <div className={styles["connect__call"]}>
        {!call
          ? <Image style={{ width: '56px', height: '56px', background: 'transparent' }} src={microfonClose} alt="Microfon Close" />
          : <Image style={{ width: '56px', height: '56px', background: 'transparent' }} src={microfon} alt="Microfon" />
        }
        <Image src={callEnd} alt="Call-End" className={styles["connect__call-end"]} />
      </div>
    </div>
  )
}

export default TimerAndButtons;
