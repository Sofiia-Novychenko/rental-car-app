import { createSlice } from '@reduxjs/toolkit';
import { fetchCars } from './operations';

const handlePending = state => {
  state.loading = true;
};
const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const slice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    page: 1,
    totalPages: null,
    totalCars: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCars(state) {
      state.cars = [];
      state.page = 1;
      state.totalPages = null;
      state.totalCars = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        if (payload.page === 1) {
          state.cars = payload.cars;
        } else {
          state.cars = [...state.cars, ...payload.cars];
        }
        state.page = payload.page;
        state.totalCars = payload.totalCars;
        state.totalPages = payload.totalPages;
      })
      .addCase(fetchCars.rejected, handleRejected);
  },
});
export const { resetCars } = slice.actions;
export default slice.reducer;
