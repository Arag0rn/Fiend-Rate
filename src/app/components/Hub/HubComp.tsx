"use client"

import React, { useContext, useEffect, useState, useRef  } from 'react';
import { RoomContext } from '../Context/RomContext';
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { activeUsers } from '@/app/REDUX/Users/selectors';
import { getAllActive } from '@/app/REDUX/Users/operations';
import { Dispatch } from '@/app/REDUX/store';
import { useRouter } from 'next/navigation';
import { UserData } from '@/app/REDUX/Users/slice';


export const HubComp = () => {
    const { ws, me } = useContext(RoomContext);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [value, setValue] = useState(0);
    const { user } = useAuth();
    const active = useSelector(activeUsers);
    const router = useRouter();
    const dispatch: Dispatch = useDispatch();
    const [activeUsersID, setActiveUsersID] = useState<string[]>([]);
    const matchRef = useRef<UserData | null>(null);

    useEffect(() => {
        if (activeUsersID.length > 0) {
            dispatch(getAllActive({ users: activeUsersID }));
        }
    }, [activeUsersID, dispatch]);

    useEffect(() => {
        const handleUsersList = ({ users }: { users: string[] }) => {
            setActiveUsersID([...users]);
        };

        ws.emit('user-join-hub', user?._id);
        ws.on('users-list', handleUsersList);
        return () => {
            ws.off('users-list', handleUsersList);
        };
    }, [user?._id, ws]);

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    useEffect(() => {
        const info = localStorage.getItem('info');
        if (info) {
            const { selectedLanguage, selectedGender, value } = JSON.parse(info);
            setSelectedLanguage(selectedLanguage);
            setSelectedGender(selectedGender);
            setValue(value);
            const usersArray = Object.values(active); 
            const match = usersArray.find(user => {
                return user.language === selectedLanguage && user.gender === selectedGender && calculateAge(user.age) >= value[0] && user.age <= value[1];
            });
            matchRef.current = match || null;
        }
    }, [active]);

    console.log('language:', selectedLanguage);
    console.log('gender:', selectedGender);
    console.log('value:', value);
    console.log('active:', active);
    console.log('match:', matchRef.current);
  

    const connectToRoom = () => {
        ws.emit('create-room', { peerId: me._id, selectedLanguage, selectedGender });
    };

    return (
        <div>
            <h1>Hub</h1>
            {active.length > 0 ? (
                <>
                    {active.map(user => (
                        <h2 key={user._id}>{user.username}</h2>
                    ))}

                    <button onClick={connectToRoom}>Click ME</button>
                </>
            ) : (
                <p>No active users found</p>
            )}
        </div>
    );
};