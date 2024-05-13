import { createSlice } from '@reduxjs/toolkit';
import { getAllActive } from './operations';

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
    filter(arg0: (user: any) => boolean): unknown;
    users: UserData[],
    isRefreshing: boolean;
    isError: boolean;
}

type InitState = UsersState;  

const initialState: InitState = {
    users: [],
    isRefreshing: false,
    isError: false,
    filter: function (arg0: (user: any) => boolean): unknown {
        throw new Error('Function not implemented.');
    }
};

const activeUsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    //fullfilled
    builder.addCase(getAllActive.fulfilled, (state, action) => {
        state.users = [...state.users, ...action.payload];
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