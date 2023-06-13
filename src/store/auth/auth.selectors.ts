import { RootState } from "../appStore";
import { createSelector } from "@reduxjs/toolkit";

const authSlice = (state: RootState) => {
  return state.auth;
};

export const getUser = createSelector(
  authSlice,
  (slice): string => {
    return slice.user;
  }
);