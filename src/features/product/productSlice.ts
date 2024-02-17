import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/src/types/types-external';

import { fetchProductByCategory, fetchProductById, fetchProducts } from '@/api/productApi';
import type { AppDispatch, RootState } from '@/features/store';
import { Product } from '@/interface/Product';

export interface ProductState {
  products: Product[];
  productsByCategory: Product[];
  product: any;
  like: Product[];
}

const initialState: ProductState = {
  products: [],
  productsByCategory: [],
  product: null,
  like: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state: WritableDraft<ProductState>, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setProductsByCategory: (state: WritableDraft<ProductState>, action: PayloadAction<Product[]>) => {
      state.productsByCategory = action.payload;
    },
    setProduct: (state: WritableDraft<ProductState>, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    setLike: (state: WritableDraft<ProductState>, action: PayloadAction<Product[]>) => {
      state.like = action.payload;
    },
  },
});

export const { setLike, setProducts, setProduct, setProductsByCategory } = productSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const selectLikes = (state: RootState) => state.products.like;
export const selectProductsByCategory = (state: RootState) => state.products.productsByCategory;
export const selectProduct = (state: RootState) => state.products.product;
export const getProductsAsync = () => async (dispatch: AppDispatch) => {
  await fetchProducts().then((el: Product[]) => dispatch(setProducts(el)));
};

export const getProductsByCategoryAsync = (category: string) => async (dispatch: AppDispatch) => {
  await fetchProductByCategory(category).then((el: Product[]) => dispatch(setProductsByCategory(el)));
};
export const setProductsAsync = (newData?: Product[]) => async (dispatch: AppDispatch) => {
  if (newData) {
    dispatch(setProducts(newData));
  } else {
    await fetchProducts().then((el: Product[]) => dispatch(setProducts(el)));
  }
};

export const getProductAsync = (id: number | string) => async (dispatch: AppDispatch) => {
  await fetchProductById(id).then((el: Product) => dispatch(setProduct(el)));
};

export default productSlice.reducer;
