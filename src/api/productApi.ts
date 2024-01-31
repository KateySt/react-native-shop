import { HOST } from '@/constant/api';

export async function fetchProducts(): Promise<void> {
  return await fetch(HOST + '/products').then((res) => res.json());
}

export async function fetchProduct(id: number | string): Promise<void> {
  return await fetch(HOST + '/products/' + id).then((res) => res.json());
}
