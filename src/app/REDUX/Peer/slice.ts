import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeer } from './actions';

export type PeerState = Record<
    string,
    { stream?: MediaStream; userName?: string; peerId: string }
>;

const initialState: PeerState = {};

const peerSlice = createSlice({
    name: 'peers',
    initialState,
    reducers: {
        addPeerStream(state, action: PayloadAction<{ peerId: string; stream: MediaStream }>) {
            const { peerId, stream } = action.payload;
            state[peerId] = { ...state[peerId], stream };
            
        },
        removePeerStream(state, action: PayloadAction<string>) {
            const peerId = action.payload;
            state[peerId] = { ...state[peerId], stream: undefined };
        },
        addPeerName(state, action: PayloadAction<{ peerId: string; userName: string }>) {
            const { peerId, userName } = action.payload;
            state[peerId] = { ...state[peerId], userName };
        },
        addAllPeers(state, action: PayloadAction<{ peers: Record<string, IPeer> }>) {
            const { peers } = action.payload;
            return { ...state, ...peers };
        },
            },
        });
            export const peerReducer = peerSlice.reducer;