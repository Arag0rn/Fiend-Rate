import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { addPeerStreamAction, removePeerStreamAction } from '@/app/REDUX/Peer/actions';
import { selectedPeers } from '@/app/REDUX/Peer/selector';
import { Dispatch } from '@/app/REDUX/store';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  socketIOClient  from 'socket.io-client';


let Peer;
if (typeof window !== "undefined") {
     Peer = require("peerjs").default;
}

// const server = 'http://localhost:3000'
const server2 = 'http://localhost:3000'

export const RoomContext = createContext<any | null>(null);

const ws = socketIOClient(server2);

export const RoomProvider = ({children}) => {
    const router = useRouter();
    const [me, setMe] = useState<typeof Peer>();
    const [stream, setStream] = useState<MediaStream>();
    const { user } = useAuth();  
    const dispatch:Dispatch = useDispatch();
    const peers = useSelector(selectedPeers)

    const enterRoom = ({ roomId}: { roomId: string}) => {
    router.push(`/chatRoom/${roomId}`)

    }

    const removePeer = (peerId: string) => {
        dispatch(removePeerStreamAction(peerId));
    };

    
    const handleUserList = ({ users }: { users: string[] }) => {
        users.map((peerId) => {
            const call = stream && me?.call(peerId, stream);
            console.log("call", call);
            call?.on("stream", (userVideoStream: MediaStream) => {
                dispatch(addPeerStreamAction(peerId, userVideoStream));
            });
        });
    };

    useEffect(() => {
        const meId = user?._id;
        const peer = new Peer(meId);
        setMe(peer);

        try {
            navigator.mediaDevices
            .getUserMedia({ video: true})
            .then((stream)=>{
                setStream(stream);
            })
        } catch (error) {
            console.log(error);
        }

        ws.on("room-created", enterRoom);
        ws.on("get-user", handleUserList);
        ws.on("user-disconnected", removePeer);
    }, []);

    useEffect(()=> {
        if(!me) return;
        if(!stream) return;    

        ws.on("user-joined", ({ peerId }: { roomId: string; peerId: string }) => {
            const call = stream && me.call(peerId, stream);
            call.on("stream", (peerStream)=>{
                dispatch(addPeerStreamAction(peerId, peerStream ))
                
            })
            
        })
        me.on('call', (call)=>{
            call.answer(stream)
            call.on("stream", (peerStream)=>{
                dispatch(addPeerStreamAction(call.peer, peerStream ))
            })
        
        })

    }, [])
    
    
   return (
   <RoomContext.Provider value={{ws, me, stream, peers}}>{children}</RoomContext.Provider>)
}