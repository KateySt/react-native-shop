export async function fetchProducts(): Promise<void> {
  return await fetch('https://fakestoreapi.com/products').then((res) => res.json());
}
