import { BaseQueryApi, TagDescription, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_FIREBASE_URL } from '../../shared/api/endpoints';
import { UserAction, UserHistory } from './user-history.state';
import { RootState } from '../appStore';
import { User } from '../auth/auth.state';
import { FirebaseData, FirebasePostPayload } from '../../shared/models/firebase.model';

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
    getUserHistory: builder.query<UserHistory[], void>({
      query: (_: void) => {
        return {
          url: subPath,
          method: 'GET'
        };
      },
      transformResponse: (response: FirebaseData<UserAction>, _meta, _args: void) => {
        const fireKeys = Object.keys(response);
        const userHistory: UserHistory[] = [];
        fireKeys.forEach((key: string) => { 
          const history: UserHistory = {
            ...response[key],
            fireId: key
          };
          userHistory.push(history);
        });
        return userHistory;
      },
      providesTags: (result: UserHistory[] | undefined, _error, _args, _meta) => {
        const tags: TagDescription<"UserHistory">[] = [];
        if (result) {
          result.forEach((history: UserHistory) => {
            tags.push({
              type: UserHistoryTag,
              id: history.fireId
            });
          });
        }
        return [{type: UserHistoryTag, id: 'ALL'}, ...tags];
      }
    }),

    appendUserHistory: builder.mutation<FirebasePostPayload, UserAction>({
      async queryFn(arg: UserAction, api: BaseQueryApi, extraOptions, baseQuery) {
        const appState = api.getState() as RootState;
        const user: User = appState.auth.user;
        const userAction: UserAction = {
          ...arg,
          timestamp: new Date().getTime(),
          user
        };
        const result = await baseQuery({
          url: subPath,
          method: 'POST',
          body: userAction,
        });
        return {
          data: result.data as FirebasePostPayload
        };
      },
      invalidatesTags: (result, error, args, meta) => {
        return [{type: UserHistoryTag, id: 'ALL'}];
      },
     
    }),
  })
});


export const { useGetUserHistoryQuery, useAppendUserHistoryMutation } = userHistoryApi;