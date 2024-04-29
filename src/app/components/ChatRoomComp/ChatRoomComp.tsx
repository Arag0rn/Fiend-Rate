"use client"
import React, { useContext, useEffect, useState } from 'react';
import { RoomContext } from '../Context/RomContext';
import { Video } from './Video';


export const ChatRoomComp = () => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const url = window.location.href;
    const segments = url.split('/');
    const id = segments[segments.length - 1];
    const { ws, me, peers, stream } = useContext(RoomContext);

    useEffect(() => {
        me?.on("open", () => {
            ws.emit("join-room", { roomId: id, peerId: me._lastServerId });
        });
    }, []);

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

    return (
        <>
            <h1>ChatRoom</h1>
            {stream && <Video stream={stream}/>}
            {Object.values(peers).map((peer: any) => (
                    <Video key={peer.id} stream={peer.stream} />
                ))}
            {stream && <p>Time Elapsed: {formatTime(timeElapsed)}</p>}
        </>
    );
};