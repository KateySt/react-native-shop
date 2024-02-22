import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/src/types/types-external';

import { fetchCartByUserId } from '@/api/cartApi';
import type { AppDispatch, RootState } from '@/features/store';
import { Order } from '@/interface/Order';

export interface CartState {
  carts: Order[];
}

const initialState: CartState = {
  carts: [] as Order[],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCarts: (state: WritableDraft<CartState>, action: PayloadAction<Order[]>) => {
      state.carts = action.payload;
    },
  },
});

export const { setCarts } = cartSlice.actions;

export const selectCart = (state: RootState) => state.carts.carts;

export const getCartsAsync = (id: number | string) => async (dispatch: AppDispatch) => {
  await fetchCartByUserId(id).then((el: Order[]) => dispatch(setCarts(el)));
};

export default cartSlice.reducer;
