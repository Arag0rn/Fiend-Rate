import { createSlice } from '@reduxjs/toolkit';
import { getAllActive } from './operations';
import { OpositUser } from '@/app/components/ConnectPage/AuthorizedUser';

export interface UserData {
    age(age: any): unknown;
    _id: string;
    email: string;
    avatarURL: string;
    token: string;
    about: string;
    birthday: string;
    username: string;
    gender: string;
    language: string;
}

export interface UsersState {
    users: UserData[],
    isRefreshing: boolean;
    isError: boolean;
    userNames: OpositUser | null;
}

type InitState = UsersState;  

const initialState: InitState = {
    users: [],
    isRefreshing: false,
    isError: false,
    userNames: null 
};

const activeUsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserNames: (state, action) => {
            return {
                ...state,
                userNames: action.payload
            };
        },
    },
    extraReducers: (builder) => {
    //fullfilled
    builder.addCase(getAllActive.fulfilled, (state, action) => {
        state.users =  action.payload;
        state.isRefreshing = false;
        state.isError = false;
    });
    //pending
        builder.addCase(getAllActive.pending, state => {
        state.isRefreshing = true;
        state.isError = false;
    });
    //rejected
        builder.addCase(getAllActive.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isError = true;
    });

    },
});

export const activeUsersReducer = activeUsersSlice.reducer;
export const { setUserNames } = activeUsersSlice.actions;