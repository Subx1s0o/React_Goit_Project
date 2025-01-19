import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import storeReducer from './auth/slice';
import { waterSlice } from './water/slice';

// import { dateSlice } from './date/slice';
// import { waterDaySlice } from './waterDayInfo/slice';
// import { waterMonthSlice } from './waterMonthInfo/slice';

const storePersistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(storePersistConfig, storeReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    // waterMonth: waterMonthSlice,
    // date: dateSlice,
    // waterDay: waterDaySlice,
    water: waterSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
