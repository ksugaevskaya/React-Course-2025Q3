import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonSlice from './slices/selected-pokemon-slice';

export const store = configureStore({
  reducer: {
    selectedPokemon: selectedPokemonSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
