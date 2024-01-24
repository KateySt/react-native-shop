export async function fetchProducts(): Promise<void> {
  return await fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) =>
      data.map((item: any, index: number) =>
        index % 2 === 0
          ? {
              ...item,
              isNew: true,
            }
          : {
              ...item,
              isNew: false,
            },
      ),
    );
}
