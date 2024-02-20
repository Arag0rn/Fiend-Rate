"use client"
import React from 'react';
import styles from "./Rate.module.scss"; 
import Container from '../Container';
import Image from 'next/image';
import rateData from './rate.json';
import DefaltFoto from '../../images/defaultFoto.png'

export const RateComponent = () => {

    const { topUsers } = rateData;

    console.log(topUsers);
    

  return (
    <Container>

        <h2 className={styles.ratehead}>FriendRate TOP</h2>
        <ul className={styles.rateList}>
          {topUsers.map(({ name, avatar, rating, id, numberOfRatings }) => (
            <li className={styles.rateCard} key={id}>
                <div className={styles.imgWrap}>
               <Image
                    src={avatar ? avatar : DefaltFoto}
                    alt={`${name}'s Profile Icon`}
                    width={40}
                    height={40}
                />
                </div>
               
              <div className={styles.rateName}>{name}</div>

              <div className={styles.rating}>{rating}</div>
              <div className={styles.numberOfRatings} >
                ({numberOfRatings})
                </div>
        
             
            </li>
          ))}
        </ul>
    </Container>
  );
}