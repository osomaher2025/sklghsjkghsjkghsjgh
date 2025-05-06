
import { configureStore } from '@reduxjs/toolkit';
import jobPostReducer from './slices/jobPostSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    jobPosts: jobPostReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
