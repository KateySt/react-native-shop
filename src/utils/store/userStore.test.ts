import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

import { fetchDeleteUser, fetchLogin, fetchUpdateUser, fetchUser, fetchUsers } from '@/api/userApi';
import userReducer, {
  creatUser,
  deleteUser,
  deleteUserAsync,
  getUserAsync,
  getUsersAsync,
  login,
  logout,
  setCred,
  setLoading,
  setUserAsync,
  updateUser,
  UserState,
} from '@/features/user/userSlice';
import { User } from '@/interface/User';

jest.mock('@/api/userApi');

const mockUser: User = {
  id: 1,
  banner: '',
  image: '',
  username: 'testUser',
  email: 'test@example.com',
  password: 'password',
  name: {
    firstname: 'John',
    lastname: 'Doe',
  },
  address: {
    city: 'New York',
    street: '123 Street',
    number: 123,
    zipcode: '10001',
    geolocation: {
      lat: '40.7128',
      long: '-74.006',
    },
  },
  phone: '1234567890',
};

const mockState: UserState = {
  user: mockUser,
  isLoading: false,
  error: null,
  jwt: 'mockToken',
  users: [mockUser],
  cred: { username: 'testUser', password: 'password' },
};

describe('userSlice', () => {
  let store: EnhancedStore<UserState>;

  beforeEach(() => {
    store = configureStore({
      reducer: userReducer,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('reducers', () => {
    it('should handle login', () => {
      const action = login('mockToken');
      const newState = userReducer(mockState, action);
      expect(newState.jwt).toEqual('mockToken');
      expect(newState.isLoading).toEqual(false);
      expect(newState.error).toEqual(null);
    });

    it('should handle setCred', () => {
      const action = setCred({ username: 'test', password: 'password' });
      const newState = userReducer(mockState, action);
      expect(newState.cred).toEqual({ username: 'test', password: 'password' });
    });

    it('should handle logout', () => {
      const newState = userReducer(mockState, logout());
      expect(newState.jwt).toBeNull();
    });

    it('should handle update user', () => {
      const action = updateUser(mockUser);
      const newState = userReducer(mockState, action);
      expect(newState.user).toEqual(mockUser);
    });

    it('should handle setLoading', () => {
      const action = setLoading(true);
      const newState = userReducer(mockState, action);
      expect(newState.isLoading).toEqual(true);
    });

    it('should handle creatUser', () => {
      const newUser: User = {
        id: 2,
        banner: '',
        image: '',
        username: 'newUser',
        email: 'new@example.com',
        password: 'password',
        name: {
          firstname: 'Jane',
          lastname: 'Doe',
        },
        address: {
          city: 'New York',
          street: '456 Street',
          number: 456,
          zipcode: '10002',
          geolocation: {
            lat: '40.7128',
            long: '-74.006',
          },
        },
        phone: '0987654321',
      };
      const action = creatUser(newUser);
      const newState = userReducer(mockState, action);
      expect(newState.users).toHaveLength(2);
      expect(newState.users[1]).toEqual(newUser);
      expect(newState.user).toEqual(newUser);
    });

    it('should handle deleteUser', () => {
      const action = deleteUser(mockUser);
      const newState = userReducer(mockState, action);
      expect(newState.user).toBeNull();
      expect(newState.users).toHaveLength(1);
    });
  });

  describe('async actions', () => {
    it('should dispatch getUsersAsync correctly', async () => {
      (fetchUsers as jest.Mock).mockResolvedValueOnce([mockUser]);
      await store.dispatch(getUsersAsync() as any);
      const state = store.getState();
      expect(state.users).toEqual([mockUser]);
    });

    it('should dispatch getUserAsync correctly', async () => {
      (fetchUser as jest.Mock).mockResolvedValueOnce(mockUser);
      await store.dispatch(getUserAsync('1') as any);
      const state = store.getState();
      expect(state.user).toEqual(mockUser);
    });

    it('should dispatch deleteUserAsync correctly', async () => {
      (fetchDeleteUser as jest.Mock).mockResolvedValueOnce(mockUser);
      await store.dispatch(deleteUserAsync(String(mockUser.id)) as any);
      const state = store.getState();
      expect(state.users).toHaveLength(0);
    });
  });
});
