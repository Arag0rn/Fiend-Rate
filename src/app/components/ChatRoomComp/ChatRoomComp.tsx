"use client"
import React, { useContext, useEffect, useState } from 'react';
import { RoomContext } from '../Context/RomContext';
import { Video } from './Video';
import styles from './ChatRoomComp.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import callEnd from "../../images/call-end.svg"
import ConnectPage from '../ConnectPage';

export const ChatRoomComp = () => {
    const [timeElapsed, setTimeElapsed] = useState(0);

    const url = window.location.href;
    const segments = url.split('/');
    const id = segments[segments.length - 1];
    const { ws, me, peers, stream, userInRoom, isConnected } = useContext(RoomContext);
    const router = useRouter();

    useEffect(() => {
        me?.on("open", () => {
            ws.emit("join-room", { roomId: id, peerId: me._id });

        });
    }, [id, me, ws]);

    useEffect(() => {
        let intervalId;

        if (stream) {
            intervalId = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [stream]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleEndCall = () => {

        ws.disconnect()

        router.push("/main");
    };


    return (
        <>
            {!isConnected ? (
                <ConnectPage lng={undefined} />
            ) : (
                <>
                    <h1>ChatRoom</h1>
                    <div className={styles.videogrid}>
                        {stream && <Video stream={stream} />}
                        {Object.values(peers).map((peer: any) => (
                            <Video key={peer.id} stream={peer.stream} />
                        ))}
                        <button onClick={handleEndCall}>
                            <Image className={styles.icon} src={callEnd} alt="show_icon" />
                        </button>
                        {/* {userInRoom.map((user) => (
                            <p key={user} className={styles.time}>{user}</p>
                        ))} */}
                        {stream && <p className={styles.time}>Time Elapsed: {formatTime(timeElapsed)}</p>}
                    </div>
                </>
            )}
        </>
    );
};