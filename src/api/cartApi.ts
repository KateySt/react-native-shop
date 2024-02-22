import { HOST } from '@/constant/api';
import { Order } from '@/interface/Order';

export async function fetchCartByUserId(id: number | string): Promise<Order[]> {
  return await fetch(HOST + '/carts/user/' + id).then((res) => res.json());
}
