import { PeerState } from "./slice";

export const selectedPeers = (state: { peers: PeerState }) => state.peers;