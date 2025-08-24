import { createSlice } from '@reduxjs/toolkit';

export interface CountriesState {
  value: string[];
}

const initialState: CountriesState = {
  value: ['Belarus', 'Poland', 'Spain', 'Georgia', 'Italy', 'Germany'],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
