import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { Dispatch } from '@/app/REDUX/store';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  socketIOClient  from 'socket.io-client';
import { addPeerAction, removePeerAction } from './PeerAction';
import { peersReducer } from './peersReducer';
import Peer from "peerjs";
import { v4 as uuidV4 } from 'uuid';


const server = 'http://localhost:3000'
const server2 = 'https://whispering-falls-70384-f5d92e367b77.herokuapp.com'  

export const RoomContext = createContext<any | null>(null);

const ws = socketIOClient(server);

export const RoomProvider = ({children}) => {
    const router = useRouter();
    const [me, setMe] = useState<Peer | null>(null);
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [stream, setStream] = useState<MediaStream>();
    const [userInRoom, setUserInRoom] = useState<string[]>();
    const { user } = useAuth(); 
  
    const enterRoom = useCallback((roomId) => {
      router.push(`/chatRoom/${roomId}`);
    }, [router]);

      
    const handleUserList = useCallback(({ users, names, roomId }: { users: string[], names: string[], roomId: string }) => {
      setUserInRoom([...names]);
      users.forEach((peerId) => {
        const call = stream && me?.call(peerId, stream);
        call?.on("stream", (userVideoStream: MediaStream) => {
          dispatch(addPeerAction(peerId, userVideoStream));
        });
      });
      if (users.length === 2) {
        enterRoom(roomId);
      }
    }, [stream, me, setUserInRoom, dispatch, enterRoom]);

    const removePeer = (peerId: string) => {
      dispatch(removePeerAction(peerId));
  };

  
    useEffect(() => {
      if (typeof window !== "undefined") {
          const meId = uuidV4()
          const peer = new Peer(meId);
          setMe(peer);
          peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
          });
          try {
            navigator.mediaDevices
              .getUserMedia({ video: true})
              .then((stream)=>{
                setStream(stream);
              })
          } catch (error) {
            console.log(error);
          }
    
        };
    }, []);

    useEffect(()=> {
      if (!stream) return;
      if (!me) return;
      
      ws.on("get-user", handleUserList);
      ws.on("user-disconnected", removePeer);
      
      ws.on("user-joined", ( { roomId, peerId }) => {
          const call = me.call(peerId, stream);
          if (call) { 
              call.on("stream", (userVideoStream: MediaStream) => {
                  dispatch(addPeerAction(peerId, userVideoStream));
              });
          } else {
              console.log("Call is undefined");
          }
  
            
          
      });
  
      me.on('call', (call)=>{
          call.answer(stream)
          call.on("stream", (userVideoStream) => {
              dispatch(addPeerAction(call.peer, userVideoStream));
          });
      });
  }, [handleUserList, me, router, stream]);
    
   return (
   <RoomContext.Provider value={{ws, me, stream, peers, userInRoom}}>{children}</RoomContext.Provider>)
}