'use client';
import React, { useEffect, useState } from 'react'
import Container from '../Container';
import LoaderConnect from './LoaderConnect/LoaderConnect';
import styles from './styles.module.scss';
import AuthorizedUser from './AuthorizedUser';
import Navbar from '../NavBar/Navbar';
import microfon from '../../images/microfon-open.svg';
import callEnd from '../../images/call-end.svg';
import microfonClose from '../../images/close-microfon.svg';
import TimerAndButtons from './TimerAndButtons';
import NotAuthorizedUser from './NotAuthorizedUser';
import { usePathname } from 'next/navigation';

const ConnectPage = ({ lng }) => {
  const [time, setTime] = useState(0);
  const [call, setCall] = useState(false);
  const [search, setSearch] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.connect}>
      <Container>
        <div className={styles["connect__content"]}>
          <div className={styles["connect__content-block"]}>
            {spinner && <LoaderConnect />}
            {pathname === `/${lng}/connect/authorized`
              &&  <AuthorizedUser
                    search={search}
                    isConnected={isConnected}
                    spinner={spinner}
                    call={call}
                    pathname={pathname}
                    lng={lng}
                  />
            }
            {pathname === `/${lng}/connect/notAuthorized`
              &&  <NotAuthorizedUser
                    search={search}
                    spinner={spinner}
                    isConnected={isConnected}
                    call={call}
                    pathname={pathname}
                    lng={lng}
                  />
            }
          </div>
          {!spinner
            &&  <TimerAndButtons
                  call={call}
                  microfonClose={microfonClose}
                  microfon={microfon}
                  callEnd={callEnd}
                  time={time}
                  formatTime={formatTime}
                />
          }
          {spinner && search && <span className={styles["connect__text"]}>Search</span>}
          {spinner && isConnected && <span className={styles["connect__text"]}>Connection</span>}
          {spinner && isConnected && <span className={styles["connect__text"]}>Connected</span>}

            {pathname === `/${lng}/connect/notAuthorized`
              ? spinner && <Navbar style={{pointerEvents: 'none', opacity: 0.5 }} />
              : spinner && <Navbar />}
        </div>
        {!spinner && <div className={styles["connect__gradient"]}></div>}
        {!spinner && <div className={styles["connect__gradient-right"]}></div>}
        {!spinner && <div className={styles["connect__gradient-bottom"]}></div>}
      </Container>
    </div>
  )
}

export default ConnectPage;
