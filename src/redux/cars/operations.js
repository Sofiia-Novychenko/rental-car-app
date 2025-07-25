import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// `/cars?brand=${brand}&rentalPrice=${rentalPrice}&minMileage=${minMileage}&maxMileage=${maxMileage}&limit=${limit}&page=${page}`
// {
//   brand = '',
//   rentalPrice = '',
//   minMileage = '',
//   maxMileage = '',
//   limit = '',
//   page = 1,
// },

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cars');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.message);
    }
  }
);
