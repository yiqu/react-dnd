import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authSliceReducer from './auth/auth.reducer';
import pokemonConfigSliceReducer, { pokemonConfigSlice } from '../core/store/pokemon-config.reducer';
import { pokemonApi } from '../core/store/pokemon.api';
import { persistStore } from 'redux-persist';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import { userHistoryApi } from './user-history/user-history.api';
import userHistoryConfigSliceReducer, { userHistoryConfigSlice } from './user-history/user-history.reducer';

export const appStore = configureStore({
  reducer: {
    auth: authSliceReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [pokemonConfigSlice.name]: pokemonConfigSliceReducer,
    [userHistoryApi.reducerPath]: userHistoryApi.reducer,
    [userHistoryConfigSlice.name]: userHistoryConfigSliceReducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] // needed for Redux-persist
      },
      thunk: true,
    }).concat(pokemonApi.middleware).concat(userHistoryApi.middleware);
  },
  
  devTools: {
    trace: true,
    name: 'Pokemon Drag And Drop',
    actionsDenylist: ['__rtkq/focused', '__rtkq/unfocused']
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(appStore.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;

export const persistor = persistStore(appStore);
