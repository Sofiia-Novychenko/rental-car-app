import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands } from './operations';

const handlePending = state => {
  state.loading = true;
};
const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const slice = createSlice({
  name: 'filters',
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBrands.pending, handlePending)
      .addCase(fetchBrands.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.brands = payload;
      })
      .addCase(fetchBrands.rejected, handleRejected);
  },
});
export default slice.reducer;
