import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import selectedPokemonSlice from './slices/selected-pokemon-slice';
import { pokemonApi } from './services/pokemonApi';

export const store = configureStore({
  reducer: {
    selectedPokemon: selectedPokemonSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
