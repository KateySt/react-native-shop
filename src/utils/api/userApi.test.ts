import { fetchLogin, fetchUsers, fetchUser, fetchUpdateUser, fetchDeleteUser } from '@/api/userApi';
import { HOST } from '@/constant/api';
import { User } from '@/interface/User';

global.fetch = jest.fn();

describe('API functions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockResponse = (status: number, data: any) => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      status,
      json: jest.fn().mockResolvedValueOnce(data),
    } as unknown as Response);
  };

  describe('fetchLogin', () => {
    it('should fetch login with username and password', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const token = 'testtoken';
      mockResponse(200, { token });

      const result = await fetchLogin(username, password);

      expect(result).toEqual({ token });
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining(HOST + '/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
    });
  });

  describe('fetchUsers', () => {
    it('should fetch users', async () => {
      const users = [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' },
      ];
      mockResponse(200, users);

      const result = await fetchUsers();

      expect(result).toEqual(users);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/users'));
    });
  });

  describe('fetchUser', () => {
    it('should fetch user by id', async () => {
      const userId = 123;
      const user = { id: userId, username: 'testuser' };
      mockResponse(200, user);

      const result = await fetchUser(userId);

      expect(result).toEqual(user);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/users/${userId}`));
    });
  });

  describe('fetchUpdateUser', () => {
    it('should update user by id', async () => {
      const userId = 123;
      const user: User = {
        id: userId,
        image: '',
        banner: '',
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        name: { firstname: 'John', lastname: 'Doe' },
        address: {
          city: 'New York',
          street: '123 Street',
          number: 123,
          zipcode: '10001',
          geolocation: { lat: '40.7128', long: '-74.006' },
        },
        phone: '1234567890',
      };

      mockResponse(200, user);

      const updatedUser = await fetchUpdateUser(userId, user);

      expect(updatedUser).toEqual(user);
      expect(fetch).toHaveBeenCalledWith(`${HOST}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    });
  });

  describe('fetchDeleteUser', () => {
    it('should delete user by id', async () => {
      const userId = '123';
      const user = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        name: { firstname: 'John', lastname: 'Doe' },
        address: {
          city: 'New York',
          street: '123 Street',
          number: '123',
          zipcode: '10001',
          geolocation: { lat: 40.7128, long: -74.006 },
        },
        phone: '1234567890',
      };

      mockResponse(200, user);

      const deletedUser = await fetchDeleteUser(userId);

      expect(deletedUser).toEqual(user);
      expect(fetch).toHaveBeenCalledWith(`${HOST}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });
});
