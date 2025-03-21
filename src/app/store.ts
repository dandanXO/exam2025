import { configureStore } from '@reduxjs/toolkit';
import qrReducer from '../features/qr/qrSlice';

export const store = configureStore({
  reducer: {
    qr: qrReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
