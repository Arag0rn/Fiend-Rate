import { ReactElement } from 'react';
import styles from './styles.module.scss';
import rateStar from '../../../images/profile/star-rate.svg';
import Image from 'next/image';

const Rate = ({children}: {children: ReactElement | string}) => {
  return (
    <div className={styles.rate}>
        <Image className={styles.star} src={rateStar} alt="Star" />
        {children}
    </div>
  )
}

export default Rate