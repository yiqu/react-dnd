import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PokemonConfigState } from './pokemon.state';
import { pokemonApi } from './pokemon.api';
import toast from 'react-hot-toast';


const initialState: PokemonConfigState = {
  recentSearches: [],
  allowCrossRegionDrag: false
};

export const pokemonConfigSlice = createSlice({
  name: 'pokemonConfig',
  initialState,
  reducers: {
    addRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches.unshift(action.payload);
    },
    toggleCrossRegionDrag: (state, action: PayloadAction<boolean>) => {
      state.allowCrossRegionDrag = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(pokemonApi.endpoints.updateRegions.matchFulfilled, (state, action: PayloadAction<string[]>) => {
      toast.success("Updated Regions' order successfully!");
    });
    builder.addMatcher(pokemonApi.endpoints.updateRegions.matchRejected, (state, action) => {
      toast.error("Updating Regions' order failed!");
    });
  }
});

export const { addRecentSearch, toggleCrossRegionDrag } = pokemonConfigSlice.actions;

export default pokemonConfigSlice.reducer;