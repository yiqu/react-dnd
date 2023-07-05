import { User } from "../auth/auth.state";

export interface UserAction {
  user: User;
  action: UserActionType;
  timestamp: number;
}

export interface UserHistoryConfigState { 
  apiLoading: boolean;
}

export type UserActionType = "add-pokemon" | "remove-pokemon" | "edit-pokemon" |  "reorder-pokemon" | "reorder-region";