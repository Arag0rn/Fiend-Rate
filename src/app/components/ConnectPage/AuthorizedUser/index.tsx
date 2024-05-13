'use client';
import React from 'react';
import styles from './styles.module.scss';
import picture from '../../../images/microfon.svg';
import Stroke from '../Stroke';
import Circle from '../Circle';
import Rate from '../Rate';
import UserName from '../UserName';
import AvatarImage from '../AvatarImage';

const AuthorizedUser = (
  {
    isConnected,
    spinner,
    search,
    call,
    pathname,
    lng,
  }: {
    isConnected: boolean,
    spinner: boolean,
    search: boolean,
    call: boolean,
    pathname: string,
    lng: any,
  }) => {
  return (
    <div className={spinner ? styles.authorized : styles['authorized-call']}>
      <div className={styles["authorized__content"]}>
        <Stroke spinner={spinner}>
          <Circle pathname={pathname} lng={lng} call={call} isConnected={isConnected}>
            <AvatarImage search={search} src={picture} isConnected={isConnected}/>

            <Rate>0.0</Rate>
            <UserName>{!search && 'Antonio777'}</UserName>
          </Circle>
        </Stroke>
      </div>
    </div>
  )
}

export default AuthorizedUser;
