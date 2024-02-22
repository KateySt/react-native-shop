import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '@/features/cart/cartSlice';
import productsReducer from '@/features/product/productSlice';
import uiReducer from '@/features/ui/uiSlice';
import userReducer from '@/features/user/userSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    ui: uiReducer,
    users: userReducer,
    carts: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
