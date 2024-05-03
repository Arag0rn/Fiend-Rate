import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface GetAllActiveData {
    users: string[];
  }

  export const getAllActive = createAsyncThunk(
    'users/getAllActive',
    async (data: GetAllActiveData, thunkAPI) => {
      try {
        const res = await axios.post('/api/user/get-all', data); 
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );