"use client"
import React from 'react';
import styles from "./Rate.module.scss"; 
import Container from '../Container';
import Image from 'next/image';
import rateData from './rate.json';
import DefaltFoto from '../../images/Top/defaultFoto.png'
import Star from '../../images/Top/star.svg'
import { Navbar } from '../NavBar/Navbar';

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
                    src={typeof avatar === 'string' ? avatar : DefaltFoto}
                    alt={`${name}'s Profile Icon`}
                    width={40}
                    height={40}
                />
                </div>
               
              <div className={styles.rateName}>{name}</div>

             
              <div className={styles.rating}>

                 <Image className={styles.ratingStar}
                    src={Star}
                    alt={`Star`}
                    width={12}
                    height={12}
                />
                {rating}</div>
              <div className={styles.numberOfRatings} >
                ({numberOfRatings})
                </div>
        
             
            </li>
          ))}
        </ul>

        <Navbar/>
    </Container>
  );
}