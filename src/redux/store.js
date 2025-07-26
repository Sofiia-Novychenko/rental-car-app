import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters/slice.js';
import carsReducer from './cars/slice.js';
import favoritesReducer from './favorites/slice.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistedFavoritesReducer = persistReducer(
  {
    key: 'favorites',
    storage,
  },
  favoritesReducer
);
const persistedFiltersReducer = persistReducer(
  { key: 'filters', storage },
  filtersReducer
);

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: persistedFiltersReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
