import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Form {
  fname: string;
  age: string;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  checkbox: string;
  file: unknown;
}

export interface FormState {
  controlled: Form | null;
  uncontrolled: Form | null;
}

const initialState: FormState = {
  controlled: null,
  uncontrolled: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateControlledForm: (state, action: PayloadAction<Form>) => {
      state.controlled = action.payload;
    },
    updateUncontrolledForm: (state, action: PayloadAction<Form>) => {
      state.uncontrolled = action.payload;
    },
  },
});

export const { updateControlledForm, updateUncontrolledForm } =
  formSlice.actions;

export default formSlice.reducer;
