import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SelectedPokemonState {
  ids: number[];
}

const initialState: SelectedPokemonState = {
  ids: [],
};

export const counterSlice = createSlice({
  name: 'selectedPokemon',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<number>) => {
      state.ids.push(action.payload);
    },
    unselect: (state, action: PayloadAction<number>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    unselectAll: (state) => {
      state.ids = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { select, unselect, unselectAll } = counterSlice.actions;

export default counterSlice.reducer;
