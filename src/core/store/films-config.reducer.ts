/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilmsConfigState } from './films.state';

const initialState: FilmsConfigState = {
  recentSearches: []
};

export const filmsConfigSlice = createSlice({
  name: 'filmsConfig',
  initialState,
  reducers: {
    addRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches.unshift(action.payload);
    }
  },
  extraReducers: (_builder) => {
  }
});

export const { addRecentSearch } = filmsConfigSlice.actions;

export default filmsConfigSlice.reducer;