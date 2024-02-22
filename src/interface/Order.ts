import { ProductInfo } from '@/interface/ProductInfo';

export interface Order {
  id: number;
  userId: number;
  date: string;
  products: ProductInfo[];
}
