import { HOST } from '@/constant/api';
import { Product } from '@/interface/Product';

export async function fetchProducts(): Promise<Product[]> {
  return await fetch(HOST + '/products').then((res) => res.json());
}

export async function fetchProductById(id: number | string): Promise<any> {
  return await fetch(HOST + '/products/' + id).then((res) => res.json());
}

export async function fetchProductByCategory(category: number | string): Promise<Product[]> {
  return await fetch(HOST + '/products/category/' + category).then((res) => res.json());
}
