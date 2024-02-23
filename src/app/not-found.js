"use client"
import React from 'react';
import styles from './NotFound.module.scss';
import Container from './components/Container';
import Image from 'next/image';
import NotFoundImg from '../app/images/NotFound/404 page.png';


export default function NotFound() {
  return (
    <>
  <Container>
        <div className={styles.imgBlock}>
            <Image
                src={NotFoundImg}
                width={349}
                height={253}
                quality={100}
                priority={true}
                alt='Not found - Illustration of a missing page'
            />
            <p className={styles.notFoundPageTxt}>Well... it seems, that this page is missing</p>
      </div>
    <button className={styles.notFoundBtn}>HOME</button>
    </Container>
    </>

    
  )
}
