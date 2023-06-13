import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authSliceReducer from './auth/auth.reducer';
import filmsConfigSliceReducer, { filmsConfigSlice } from '../core/store/films-config.reducer';
import { filmsApi } from '../core/store/films.api';

export const appStore = configureStore({
  reducer: {
    auth: authSliceReducer,
    [filmsApi.reducerPath]: filmsApi.reducer,
    [filmsConfigSlice.name]: filmsConfigSliceReducer
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(filmsApi.middleware);
  },
  
  devTools: {
    trace: true,
    name: 'Movie Rank',
    actionsDenylist: ['__rtkq/focused', '__rtkq/unfocused']
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(appStore.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;
