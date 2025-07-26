import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (
    {
      brand = '',
      rentalPrice = '',
      minMileage = '',
      maxMileage = '',
      page = 1,
      limit = 12,
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `/cars?brand=${brand}&rentalPrice=${rentalPrice}&minMileage=${minMileage}&maxMileage=${maxMileage}&limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.message);
    }
  }
);
