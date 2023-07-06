/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './auth.state';

const initialState: AuthState = {
  user: {
    userHash: '0000',
    userAgent: undefined
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (_builder) => {
  }
});

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;