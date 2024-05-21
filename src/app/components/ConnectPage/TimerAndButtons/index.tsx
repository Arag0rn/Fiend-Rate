import React, { useContext, useState } from 'react';
import styles from '../styles.module.scss';
import Image from 'next/image';
import { RoomContext } from '../../Context/RomContext';
import { useRouter } from 'next/navigation';


const TimerAndButtons = ({
  time,
  callEnd,
  call,
  microfonClose,
  microfon,
  formatTime
}) => {
  const { ws, me, peers, stream } = useContext(RoomContext);
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  
  const handleEndCall = () => {
    ws.disconnect()
    router.push("/main");
};

const toggleMute = () => {
  if (stream) {
    stream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setIsMuted(!isMuted);
  }
};


  return (
    <div className={styles['connect__nav']}>
      <span className={styles["connect__timer"]}>{formatTime(time)}</span>
      <button style={{background: "transparent", border: 'none'}} onClick={toggleMute} className={styles["connect__call"]}>
        {isMuted
          ? <Image style={{ width: '56px', height: '56px', background: 'transparent' }} src={microfonClose} alt="Microfon Close" />
          : <Image style={{ width: '56px', height: '56px', background: 'transparent' }} src={microfon} alt="Microfon" />
        }
        <button onClick={handleEndCall} style={{background: "transparent", border: 'none'}}><Image src={callEnd} alt="Call-End" className={styles["connect__call-end"]} /></button>
      </button>
    </div>
  )
}

export default TimerAndButtons;
