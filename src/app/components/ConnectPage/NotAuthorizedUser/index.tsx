import React from 'react';
import styles from './styles.module.scss';
import Stroke from '../Stroke';
import Circle from '../Circle';
import microfon from '../../../images/microfon.svg';
import UserName from '../UserName';
import Image from 'next/image';

const NotAuthorizedUser = ({ spinner, search, isConnected, lng, call, pathname }) => {
  return (
    <div className={!spinner ? styles.main : styles['main-call']}>
      <div className={styles["main__content"]}>
        <Stroke spinner={spinner}>
          <Circle lng={lng} pathname={pathname} search={search} isConnected={isConnected} call={call}>
            <Image src={microfon} alt='Microfon' className={styles['main__avatar']} />
            <UserName>{!search && 'User 123'}</UserName>
          </Circle>
        </Stroke>
      </div>
    </div>
  )
}

export default NotAuthorizedUser