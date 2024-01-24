import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchProducts } from '@/api/productApi';
import type { RootState } from '@/app/store';
import { Product } from '@/interface/Product';

export interface ProductState {
  product: Product[];
}

const initialState: ProductState = {
  product: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<Product>) => {
      state.product.push(action.payload);
    },
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
    },
  },
});

export const { getProducts, setProduct } = productSlice.actions;

export const selectProduct = (state: RootState) => state.products.product;

export const getProductsAsync = () => async (dispatch: (arg0: PayloadAction<Product>) => void) => {
  await fetchProducts().then((el) => dispatch(getProducts(el)));
};

export const setProductsAsync = (newData?: Product[]) => async (dispatch: (arg0: PayloadAction<Product[]>) => void) => {
  if (newData) {
    dispatch(setProduct(newData));
  } else {
    await fetchProducts().then((el) => dispatch(setProduct(el)));
  }
};

export default productSlice.reducer;
