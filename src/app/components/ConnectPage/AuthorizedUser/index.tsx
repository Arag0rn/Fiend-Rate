'use client';
import React from 'react';
import styles from './styles.module.scss';
import picture from '../../../images/microfon.svg';
import Stroke from '../Stroke';
import Circle from '../Circle';
import Rate from '../Rate';
import UserName from '../UserName';
import AvatarImage from '../AvatarImage';
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { useSelector } from 'react-redux';
import { usersNames } from '@/app/REDUX/Users/selectors';

const AuthorizedUser = (
  {
    isConnected,
    spinner,
    search,
    call,
    lng,
  }: {
    isConnected: boolean,
    spinner: boolean,
    search: boolean,
    call: boolean,
    lng: any,
  }) => {

    const { user } = useAuth(); 
    const usersInRoom = useSelector(usersNames)
    const opositUser = usersInRoom.filter((u) => u !== user?.username);
    

  return (
    <div className={spinner ? styles.authorized : styles['authorized-call']}>
      <div className={styles["authorized__content"]}>
        <Stroke spinner={spinner}>
          <Circle  lng={lng} call={call} isConnected={isConnected}>
            <AvatarImage search={search} src={picture} isConnected={isConnected}/>

            <Rate>0.0</Rate>
            <UserName>{!search && opositUser}</UserName>
          </Circle>
        </Stroke>
      </div>
    </div>
  )
}

export default AuthorizedUser;
