import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './repoSlice';

export const store = configureStore({
  reducer: {
    repos: repoReducer,
  },
});

// Выведите тип для `dispatch` и `RootState`
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
