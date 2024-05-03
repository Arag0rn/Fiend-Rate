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


// const server = 'http://localhost:3000'
const server2 = 'http://localhost:3000'

export const RoomContext = createContext<any | null>(null);

const ws = socketIOClient(server2);

export const RoomProvider = ({children}) => {
    const router = useRouter();
    const [me, setMe] = useState<Peer | null>(null);
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [stream, setStream] = useState<MediaStream>();
    const { user } = useAuth(); 
  
    const enterRoom = ({ roomId }: { roomId: string }) => {
        router.push(`/chatRoom/${roomId}`);
      }
      
      
      const handleUserList = ({ users }: { users: string[] }) => {
        console.log(users);
        
        users.map((peerId) => {
          console.log(stream);
          console.log(me);
            const call = stream && me?.call(peerId, stream);
            console.log("call", call);
            call?.on("stream", (userVideoStream: MediaStream) => {
                console.log({ addPeerAction });
                dispatch(addPeerAction(peerId, userVideoStream));
            });
        });
    };

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
                console.log(stream);
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
          
      ws.on("room-created", enterRoom);
      ws.on("get-user", handleUserList);
      ws.on("user-disconnected", removePeer);
 
      
          ws.on("user-joined", ({ peerId }: { roomId: string; peerId: string }) => {
              const call = me.call(peerId, stream);
              console.log(me);
              console.log(`user-joined ${peerId}`);
              console.log(call);
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
  }, [enterRoom, handleUserList, me, stream]);
    
   return (
   <RoomContext.Provider value={{ws, me, stream, peers}}>{children}</RoomContext.Provider>)
}