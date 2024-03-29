"use client"
import styles from './verify.module.scss';
import Container from '../Container';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useTranslation } from '@/i18n/client';


const server = 'http://localhost:3002'
// const server2 = 'http://whispering-falls-70384-f5d92e367b77.herokuapp.com:3002'  
const socket = io(server, {transports: ['websocket']});


socket.connect();

const VerifyEmail = ({params}) => {
  const { t } = useTranslation(params, 'verify-email');
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
    <h2 className={styles.head}>{t("verifyEmail")}</h2>
    <p className={styles.subHead}>{t("checkEmail")}</p>

    <button className={styles.resentBtn}>{t("resentEmail")}</button>
    <div className={styles.bottomLine}></div>
    </Container>
  )
}

export default VerifyEmail
