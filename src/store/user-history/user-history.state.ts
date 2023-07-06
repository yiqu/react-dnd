import { REGIONS } from "../../core/store/pokemon.state";
import { User } from "../auth/auth.state";

export interface UserAction {
  user?: User;
  actionType: UserActionType;
  actionEntity: UserActionEntity;
  actionEntitySourcePosition: number | string;
  actionEntityTargetPosition: number | string;
  actionEntitySource: UserActionRegions;
  actionEntityTarget: UserActionRegions;
  timestamp?: number;
}

export interface UserHistoryConfigState { 
  apiLoading: boolean;
}


export type UserActionEntity = "pokemon" | "region";
export type UserActionType = "add" | "remove" | "edit" | "reorder";
export type UserActionRegions = typeof REGIONS[number] | "region-area";

export interface UserHistory extends UserAction{
  fireId: string;
}

// entity  actionType source position target position
// pokemon move        kanto   3 johto 2
// pokemon edit        kanto   3 kanto 3
// pokemon add         kanto    10 kanto 10
// region move        region-area 0 region-area 1