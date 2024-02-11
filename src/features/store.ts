import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './product/productSlice';

import uiReducer from '@/features/ui/uiSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
