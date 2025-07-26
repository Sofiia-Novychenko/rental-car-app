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
    selectedBrand: '',
    selectedRentalPrice: '',
    selectedMinMileage: '',
    selectedMaxMileage: '',
    loading: false,
    error: null,
  },
  reducers: {
    setFilters(state, { payload }) {
      state.selectedBrand = payload.brand;
      state.selectedRentalPrice = payload.rentalPrice;
      state.selectedMinMileage = payload.minMileage;
      state.selectedMaxMileage = payload.maxMileage;
    },
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
export const { setFilters } = slice.actions;
export default slice.reducer;
