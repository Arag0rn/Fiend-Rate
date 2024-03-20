"use client"
import styles from './verify.module.scss';
import Container from '../Container';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const server = 'http://localhost:3002'
// const server2 = 'http://whispering-falls-70384-f5d92e367b77.herokuapp.com:3002'  
const socket = io(server, {transports: ['websocket']});


socket.connect();

const VerifyEmail = () => {
  const router = useRouter();
  const [verifiedUsers, setVerifiedUsers] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on('user_verified', (userData) => {
        setVerifiedUsers((userData));
      });


    }
  }, []);

  console.log(verifiedUsers);
  

  if (verifiedUsers) {
    router.push('/information');
  }

  return (
    <Container>
    <h2 className={styles.head}>Verify your email</h2>
    <p className={styles.subHead}>Please check up your email and confirm the message to complete the registration</p>

    <button className={styles.resentBtn}>RESENT EMAIL</button>
    <div className={styles.bottomLine}></div>
    </Container>
  )
}

export default VerifyEmail
