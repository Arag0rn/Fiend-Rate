import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refreshUser, register, updateUserData } from './operations';

export interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isError: boolean;
  token: string | null;
  user: {
    username?: string | '';
    birthday?: string | '';
    gender?: string | '';
    email: string | '';
    password: string | '';
    avatarURL?: string | '';
    verify?:boolean ;
    about?: string | '';
    language?: string | '';
  } | null;
}

type InitState = AuthState;  

const initialState: InitState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
  isLoading: true,
};

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      //fullfilled
      builder.addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        console.log(action.payload);
      });
        builder.addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      builder.addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isError = false;
        state.isLoading = false;
      });
      builder.addCase(updateUserData.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.token = action.payload.token;
        state.isRefreshing = false;
        state.isError = false;
        state.isLoading = false;
      });
      builder.addCase(logOut.fulfilled, (state, action) => {
        state.user = { username: '', birthday:'', gender:'', email:'', password:'', avatarURL:'',about:'', language:'' };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.isError = false;
        state.isLoading = false;
      });
      //rejected
      builder.addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isError = true;
      });
      builder.addCase(register.rejected, (state) => {
        state.isRefreshing = false;
      });
      //pending
      builder.addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.isError = false;
    });
      builder.addCase(register.pending, (state) => {
        state.isRefreshing = false;
      });
    },
  });
  export const authReducer = authSlice.reducer;