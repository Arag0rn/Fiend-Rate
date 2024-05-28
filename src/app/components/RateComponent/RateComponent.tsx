"use client"
import React, { useEffect } from 'react';
import styles from "./Rate.module.scss"; 
import Image from 'next/image';
import rateData from './rate.json';
import DefaltFoto from '../../images/Top/defaultFoto.png'
import Star from '../../images/Top/star.svg'
import Navbar from '../NavBar/Navbar';
import { Dispatch } from '@/app/REDUX/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWithRate } from '@/app/REDUX/Users/operations';
import { getAllUsers } from '@/app/REDUX/Users/selectors';

const RateComponent = () => {

  const dispatch: Dispatch = useDispatch();
  const AllUsers = useSelector(getAllUsers)
  console.log(AllUsers);
  

  useEffect(()=>{
    dispatch(getAllWithRate())
  },[dispatch])

    const { topUsers } = rateData;

    

    const sortedUsers = AllUsers.slice().sort((a, b) => {
      const averageRateA = ((a.rate ?? 0) / (a.ratingCount ?? 0)).toFixed(2);
      const averageRateB = ((b.rate ?? 0) / (b.ratingCount ?? 0)).toFixed(2);
      if (averageRateA !== averageRateB) {
        if (isNaN(parseFloat(averageRateA))) return 1; 
        if (isNaN(parseFloat(averageRateB))) return -1;
        return parseFloat(averageRateB) - parseFloat(averageRateA);  
      }
      if (isNaN(parseFloat(averageRateA))) return 1; 
      if (isNaN(parseFloat(averageRateB))) return -1;
      return (b.rate ?? 0) - (a.rate ?? 0);  
    }).slice(0, 10); 
    
    const formatAvatarURL = (url) => {
      if (url && (url.startsWith('www') || url.startsWith('//'))) {
        if (url.startsWith('//')) {
          return `https:${url}`;
        } else if (url.startsWith('www')) {
          return `https://${url}`;
        }
      }
      return url;
    };

  return (
    <>
      <div className={styles.rateBox}>
        <h2 className={styles.ratehead}>FriendRate TOP</h2>
        <ul className={styles.rateList}>
          {sortedUsers.map(({ username, avatarURL, rate, _id, ratingCount }, index) => (
            <li className={styles.rateCard} key={_id}>
                <div className={styles.imgWrap}>
               <Image
                    src={formatAvatarURL(avatarURL) || DefaltFoto}
                    alt={`${username}'s Profile Icon`}
                    width={40}
                    height={40}
                />

                </div>
              <div className={styles.rateNumber}>{`${index + 1}`}</div>
              <div className={styles.rateName}>{username}</div>

             
              <div className={styles.rating}>

                 <Image className={styles.ratingStar}
                    src={Star}
                    alt={`Star`}
                    width={12}
                    height={12}
                />
                {((rate ?? 0)/(ratingCount ?? 0)).toFixed(2)}</div>
              <div className={styles.numberOfRatings} >
                ({ratingCount})
                </div>
        
             
            </li>
          ))}
        </ul>
</div>
        <Navbar/>
    </>
  );
}

export default RateComponent;