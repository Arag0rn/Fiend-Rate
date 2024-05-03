"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { RoomContext } from '../Context/RomContext'
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { activeUsers } from '@/app/REDUX/Users/selectors';
import { getAllActive } from '@/app/REDUX/Users/operations';
import { Dispatch } from '@/app/REDUX/store';
import { useRouter } from 'next/navigation';


export const HubComp = () => {
    const { ws, me } = useContext(RoomContext);

    console.log(me);

    const { user } = useAuth();
    const  active  = useSelector(activeUsers)
    const router = useRouter();
    const dispatch:Dispatch = useDispatch()
    const [activeUsersID, setActiveUsersID] = useState<string[]>([])

    const handleUsersList = ({ users }: { users: string[] })=> {
      console.log(users);
      setActiveUsersID(([...users]));
    };

  useEffect(() => {
    ws.emit("user-join-hub", (user?._id))
    ws.on("users-list", handleUsersList);
    return () => {
        ws.off("users-list", handleUsersList);
    };
}, [user?._id]);


useEffect(() => {
  if (activeUsersID.length > 0) {
    dispatch(getAllActive({ users: activeUsersID }));
  }
}, [activeUsersID]);

const connectToRoom = () =>{
  ws.emit("create-room", {peerId: me._id });
}
    

    return (
      <div>
        <h1>Hub</h1>
        {active.users.map(user => (
      <h2 key={user._id}>{user.username}</h2>
    ))}  
    <button onClick={connectToRoom}>Click ME</button>
      </div>
    
    );
}




