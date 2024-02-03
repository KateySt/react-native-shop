import { HOST } from '@/constant/api';
import { Product } from '@/interface/Product';

export async function fetchProducts(): Promise<Product[]> {
  return await fetch(HOST + '/products').then((res) => res.json());
}

export async function fetchProduct(id: number | string): Promise<any> {
  return await fetch(HOST + '/products/' + id).then((res) => res.json());
}
