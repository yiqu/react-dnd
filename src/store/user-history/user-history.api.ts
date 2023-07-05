import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_FIREBASE_URL } from '../../shared/api/endpoints';
import { UserAction, UserActionType } from './user-history.state';
import { RootState } from '../appStore';
import { User } from '../auth/auth.state';
import { FirebasePostPayload } from '../../shared/models/firebase.model';

export const basePath = "react-dnd";
const subPath = `user-history.json`;

export const UserHistoryTag = "UserHistory";

export const userHistoryApi = createApi({
  reducerPath: 'userHistory',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_FIREBASE_URL + basePath
  }),
  tagTypes: [UserHistoryTag],
  endpoints: (builder) => ({
    appendUserHistory: builder.mutation<FirebasePostPayload, UserActionType>({
      async queryFn(arg: UserActionType, api: BaseQueryApi, extraOptions, baseQuery) {
        const appState = api.getState() as RootState;
        const user: User = appState.auth.user;
        const userAction: UserAction = {
          action: arg,
          timestamp: new Date().getTime(),
          user
        };
        const body = userAction;
        const result = await baseQuery({
          url: subPath,
          method: 'POST',
          body,
        });
        return {
          data: result.data as FirebasePostPayload
        };
      },
      invalidatesTags: (result, error, args, meta) => {
        return [];
      },
     
    }),
  })
});


export const { useAppendUserHistoryMutation } = userHistoryApi;