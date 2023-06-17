/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PokemonConfigState } from './pokemon.state';

const initialState: PokemonConfigState = {
  recentSearches: []
};

export const pokemonConfigSlice = createSlice({
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

export const { addRecentSearch } = pokemonConfigSlice.actions;

export default pokemonConfigSlice.reducer;