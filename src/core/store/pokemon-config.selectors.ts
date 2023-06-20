import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/appStore";

const pokemonConfigSlice = (state: RootState) => {
  return state.pokemonConfig;
};

export const selectAllowCrossRegionDrag = createSelector(
  pokemonConfigSlice,
  (state): boolean => {
    return state.allowCrossRegionDrag;
  }
);