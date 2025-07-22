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
    savedCars: [],
    page: 1,
    totalPages: null,
    totalCars: null,
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.cars = payload;
      })
      .addCase(fetchCars.rejected, handleRejected);
  },
});

export default slice.reducer;
