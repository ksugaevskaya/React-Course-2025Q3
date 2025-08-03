import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CSVPokemon = {
  id: number;
  url: string;
  description: string;
};

export interface SelectedPokemonState {
  ids: number[];
  csv: CSVPokemon[];
}

const initialState: SelectedPokemonState = {
  ids: [],
  csv: [],
};

export const counterSlice = createSlice({
  name: 'selectedPokemon',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<CSVPokemon>) => {
      state.ids.push(action.payload.id);
      state.csv.push(action.payload);
    },
    unselect: (state, action: PayloadAction<number>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      state.csv = state.csv.filter((pokemon) => pokemon.id !== action.payload);
    },
    unselectAll: (state) => {
      state.ids = [];
      state.csv = [];
    },
  },
});

export const { select, unselect, unselectAll } = counterSlice.actions;

export default counterSlice.reducer;
