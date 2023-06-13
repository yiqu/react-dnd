/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  user: 'qu'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (_builder) => {
  }
});

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;