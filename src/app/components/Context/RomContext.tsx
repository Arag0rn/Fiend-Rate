import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { Dispatch } from '@/app/REDUX/store';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  socketIOClient  from 'socket.io-client';
import { addPeerAction, clearPeersAction, removePeerAction } from './PeerAction';
import { peersReducer } from './peersReducer';
import Peer from "peerjs";
import { v4 as uuidV4 } from 'uuid';
import { setUserNames } from '@/app/REDUX/Users/slice';



const server = 'http://localhost:3000'
const server2 = 'https://friendrateback.onrender.com/'  

export const RoomContext = createContext<any | null>(null);

const ws = socketIOClient(server2);

export const RoomProvider = ({children}) => {
    const router = useRouter();
    const [me, setMe] = useState<Peer | null>(null);
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [rateModalOpen, setRateModalOpen] = useState(false)
    const [stream, setStream] = useState<MediaStream>();
    const { user } = useAuth(); 
    
    const reduxDispatch = useDispatch();
      
    const handleUserList = useCallback(({ users, names, roomId }: { users: string[], names: {}, roomId: string }) => {
       
        router.push(`/chatRoom/${roomId}`);
        users.forEach((peerId) => {
            if (stream && me) {
                const call = me.call(peerId, stream);
                call?.on("stream", (userVideoStream: MediaStream) => {
                    dispatch(addPeerAction(peerId, userVideoStream));                   
                });
            }
        });

   
        reduxDispatch(setUserNames(names));

    }, [reduxDispatch, router, stream, me]);

    const clearPeers = useCallback(() => {
        dispatch(clearPeersAction());
        setRateModalOpen(true);
    }, [dispatch]);

    // const removePeer = useCallback(
    //     (peerId: string) => {
    //       dispatch(removePeerAction(peerId));
    //       setRateModalOpen(true);
    //     },
    //     [dispatch]
    //   );

  useEffect(() => {
    if (typeof window !== "undefined") {
    const meId = uuidV4();
    const peer = new Peer(meId, {
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
          ]
        }
      });
    setMe(peer);
    try {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                setStream(stream);
            });
    } catch (err) {
        console.error({ err });
    }

}}, []);

useEffect(()=>{
    ws.on("get-user", handleUserList);
    ws.on("user-disconnected", clearPeers);
}, [handleUserList, clearPeers])

useEffect(() => {
  if (!stream) return;
  if (!me) return;
    
  ws.on(
      "user-joined",
      ({ peerId, names}) => {
        reduxDispatch(setUserNames(names));
        
          const call = stream && me.call(peerId, stream);
          call.on("stream", (userVideoStream: MediaStream) => {
              dispatch(addPeerAction(peerId, userVideoStream));             
          });
      
       
      }
  );


  me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (userVideoStream) => {
          dispatch(addPeerAction(call.peer, userVideoStream));
      });
  });

//   return () => {
//     ws.off("user-joined");
//     ws.off("get-user");
//     ws.off("user-disconnected");
// };
}, [stream, me, handleUserList, clearPeers, reduxDispatch]);

const openRateModal = () => setRateModalOpen(true);
const closeRateModal = () => setRateModalOpen(false);
    
   return (
   <RoomContext.Provider value={{ws, me, stream, peers, rateModalOpen, openRateModal, closeRateModal, clearPeers }}>{children}</RoomContext.Provider>)
}
