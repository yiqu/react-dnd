import { shortenUserAgentHash } from "../../shared/utils/user-agent";
import { RootState } from "../appStore";
import { createSelector } from "@reduxjs/toolkit";

const authSlice = (state: RootState) => {
  return state.auth;
};

export const getUserHashShort = createSelector(
  authSlice,
  (slice): string => {
    const short = shortenUserAgentHash(slice.user.userHash);
    return short;
  }
);