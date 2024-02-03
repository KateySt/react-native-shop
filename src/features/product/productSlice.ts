import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/src/types/types-external';

import { fetchProduct, fetchProducts } from '@/api/productApi';
import type { AppDispatch, RootState } from '@/features/store';
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
    setProducts: (state: WritableDraft<ProductState>, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setProduct: (state: WritableDraft<ProductState>, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
  },
});

export const { setProducts, setProduct } = productSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const selectProduct = (state: RootState) => state.products.product;
export const getProductsAsync = () => async (dispatch: AppDispatch) => {
  await fetchProducts().then((el: Product[]) => dispatch(setProducts(el)));
};

export const setProductsAsync = (newData?: Product[]) => async (dispatch: AppDispatch) => {
  if (newData) {
    dispatch(setProducts(newData));
  } else {
    await fetchProducts().then((el: Product[]) => dispatch(setProducts(el)));
  }
};

export const getProductAsync = (id: number | string) => async (dispatch: AppDispatch) => {
  await fetchProduct(id).then((el: Product) => dispatch(setProduct(el)));
};

export default productSlice.reducer;
