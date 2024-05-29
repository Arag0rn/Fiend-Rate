import { ReactElement } from 'react';
import styles from './styles.module.scss';
import rateStar from '../../../images/profile/star-rate.svg';
import Image from 'next/image';

const Rate = ({ rate, ratingCount }) => {

  console.log(rate);
  

  const averageRate = rate && ratingCount ? rate / ratingCount : 0;
  const roundedRate = Math.round(averageRate * 100) / 100;


  const stars = Array(Math.max(1, Math.floor(averageRate || 0))).fill(0);

  return (
    <div className={styles.rate}>{roundedRate || "0.0"}
        <Image className={styles.star} src={rateStar} alt="Star" />

    </div>
  );
}

export default Rate;