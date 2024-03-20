import { configureStore } from "@reduxjs/toolkit";
import { AuthState, authReducer } from "./Auth/slice";
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};


export const store = configureStore({

  reducer: {
    auth: persistReducer<AuthState>(authPersistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

});

export const persistor = persistStore(store);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;