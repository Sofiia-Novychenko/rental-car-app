import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters/slice.js';
import carsReducer from './cars/slice.js';

export const store = configureStore({
  reducer: { cars: carsReducer, filters: filtersReducer },
});
