import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


axios.defaults.baseURL = ' http://127.0.0.1:8000/';




const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};


const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};


export const register = createAsyncThunk(
  'auth/register',
  async (newUser: any, thunkAPI) => {
    console.log(newUser);
    try {
      newUser.is_active = true;
      const res = await axios.post('/user/', newUser);
      // setAuthHeader(res.data.token);
      console.log(res)
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const register = async (newUser) => {
//   try {
    

//     const token = authResponse;
//     console.log(token);

//     setAuthHeader(token);

//     const userResponse = await axios.post('user/', newUser);

//     console.log(userResponse.data);
    
//     // return userResponse.data;
//   } catch (error) {
//     console.error('Ошибка в регистрации:', error);
//     throw error;
//   }
// };


export const login = async (newUser) => {
  try {

    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA5MjMwODk2LCJpYXQiOjE3MDkyMzA1OTYsImp0aSI6ImNjZjE0YTkxNDIwNjQwNzZhZDgzNzMxYWYyYjk1OTgxIiwidXNlcl9pZCI6OH0.G_KoYtT8YdkX8xEYH1UYx7hb-laSwFj_u0EZoqEImlw";
    // setAuthHeader(token);

    const userResponse = await axios.get('/user/', newUser);

    console.log(userResponse.data);
    
    return userResponse.data;
  } catch (error) {
    console.error('Ошибка в регистрации:', error);
    throw error;
  }
};