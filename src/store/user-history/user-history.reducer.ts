import { createSlice } from '@reduxjs/toolkit';
import { UserHistoryConfigState } from './user-history.state';
import { updateUser } from '../auth/auth.reducer';

const initialState: UserHistoryConfigState = {
  apiLoading: false,
};

export const userHistoryConfigSlice = createSlice({
  name: 'userHistoryConfig',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser , (state, action) => {
      const user = action.payload;
    });
  }
});

// export const { } = userHistoryConfigSlice.actions;

export default userHistoryConfigSlice.reducer;