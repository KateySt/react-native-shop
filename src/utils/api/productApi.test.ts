import { fetchProducts, fetchProductById, fetchProductByCategory } from '@/api/productApi';
import { HOST } from '@/constant/api';

global.fetch = jest.fn();

describe('Product API functions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockResponse = (status: number, data: any) => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      status,
      json: jest.fn().mockResolvedValueOnce(data),
    } as unknown as Response);
  };

  describe('fetchProducts', () => {
    it('should fetch products', async () => {
      const products = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ];
      mockResponse(200, products);

      const result = await fetchProducts();

      expect(result).toEqual(products);
      expect(fetch).toHaveBeenCalledWith(`${HOST}/products`);
    });
  });

  describe('fetchProductById', () => {
    it('should fetch product by id', async () => {
      const productId = 123;
      const product = { id: productId, name: 'Test Product' };
      mockResponse(200, product);

      const result = await fetchProductById(productId);

      expect(result).toEqual(product);
      expect(fetch).toHaveBeenCalledWith(`${HOST}/products/${productId}`);
    });
  });

  describe('fetchProductByCategory', () => {
    it('should fetch products by category', async () => {
      const category = 'electronics';
      const products = [
        { id: 1, name: 'Product 1', category },
        { id: 2, name: 'Product 2', category },
      ];
      mockResponse(200, products);

      const result = await fetchProductByCategory(category);

      expect(result).toEqual(products);
      expect(fetch).toHaveBeenCalledWith(`${HOST}/products/category/${category}`);
    });
  });
});
