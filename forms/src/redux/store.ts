import { configureStore } from '@reduxjs/toolkit';
import formSlice from './slices/form';
import countriesSlice from './slices/countries';

export const store = configureStore({
  reducer: {
    form: formSlice,
    countries: countriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
