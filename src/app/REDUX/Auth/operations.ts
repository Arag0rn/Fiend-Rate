import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from './slice';

// axios.defaults.baseURL = 'http://localhost:3000';

axios.defaults.baseURL = 'https://whispering-falls-70384-f5d92e367b77.herokuapp.com/';


const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};


const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

interface RegisterData {
  username?: string;
  birthday?: string;
  gender?: string;
  email: string;
  password: string;
  avatar?: string;
  verify?:boolean;
};

interface UpdatedData {
  username?: string;
  birthday?: string;
  gender?: string;
  email: string;
  avatar?: string;
  verify?:boolean;
  password?: string | '';
  about?: string | '';
  language?: string | '';
};



export const register = createAsyncThunk(
  'auth/register',
  async (newUser: RegisterData, thunkAPI) => {
    console.log(newUser);
    try {
      const res = await axios.post('api/user/register', newUser);
      setAuthHeader(res.data.token);
      console.log(res)
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials:RegisterData, thunkAPI) => {
   
    try {
      const res = await axios.post('api/user/login', credentials);
      setAuthHeader(res.data.token);
      const resUser = await axios.get('/api/user/current');

      return { user: resUser.data, token: res.data.token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: AuthState };
    const persistedToken = state.auth.token;
    console.log(persistedToken);
    
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('api/user/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async (userData: UpdatedData, thunkAPI) => {
    try {
      const res = await axios.patch('/api/user/update', userData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk(
  '/auth/signout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/api/user/logout');
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);