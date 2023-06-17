import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authSliceReducer from './auth/auth.reducer';
import pokemonConfigSliceReducer, { pokemonConfigSlice } from '../core/store/pokemon-config.reducer';
import { pokemonApi } from '../core/store/pokemon.api';

export const appStore = configureStore({
  reducer: {
    auth: authSliceReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [pokemonConfigSlice.name]: pokemonConfigSliceReducer
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApi.middleware);
  },
  
  devTools: {
    trace: true,
    name: 'Pokemon Rank',
    actionsDenylist: ['__rtkq/focused', '__rtkq/unfocused']
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(appStore.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;
