import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteCars: [],
  },
  reducers: {
    addToFavorite: (state, action) => {
      const carId = action.payload;
      if (!state.favoriteCars.includes(carId)) {
        state.favoriteCars.push(carId);
      }
    },
    removeFromFavorites: (state, action) => {
      const carId = action.payload;
      state.favoriteCars = state.favoriteCars.filter(id => id !== carId);
    },
  },
});
export const { addToFavorite, removeFromFavorites } = slice.actions;
export default slice.reducer;
