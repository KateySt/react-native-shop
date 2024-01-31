import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchProduct, fetchProducts } from '@/api/productApi';
import type { RootState } from '@/app/store';
import { Product } from '@/interface/Product';

export interface ProductState {
  products: Product[];
  product: any;
}

const initialState: ProductState = {
  products: [],
  product: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    getProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
  },
});

export const { getProducts, setProduct, getProduct } = productSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
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

export const getProductAsync = (id: number | string) => async (dispatch: (arg0: PayloadAction<Product>) => void) => {
  await fetchProduct(id).then((el) => dispatch(getProduct(el)));
};

export default productSlice.reducer;
