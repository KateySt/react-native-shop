import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchCreatUser, fetchDeleteUser, fetchLogin, fetchUpdateUser, fetchUser, fetchUsers } from '@/api/userApi';
import type { AppDispatch, RootState } from '@/features/store';
import { User } from '@/interface/User';

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  jwt: string | null;
  users: User[];
  cred: { username: string; password: string } | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  users: [],
  cred: null,
};
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCred: (state, action: PayloadAction<any>) => {
      state.cred = action.payload;
    },
    login: (state, action: PayloadAction<any>) => {
      state.jwt = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    logout: (state) => {
      state.jwt = null;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    getUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    creatUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((existingUser) =>
        existingUser.id === action.payload.id ? { ...existingUser, ...action.payload } : existingUser,
      );
      if (state.user?.id === action.payload.id) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    deleteUser: (state, action: PayloadAction<User>) => {
      state.user = null;
      state.users.filter((el) => el.id !== action.payload.id);
    },
  },
});

export const { creatUser, updateUser, deleteUser, setUser, setCred, logout, getUsers, login, setLoading, setError } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectUsers = (state: RootState) => state.users.users;
export const selectJwt = (state: RootState) => state.users.jwt;
export const selectCred = (state: RootState) => state.users.cred;
export const setUserAsync = (username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const userData: { token: string } = await fetchLogin(username, password);
    dispatch(login(userData.token));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const getUsersAsync = () => async (dispatch: AppDispatch) => {
  await fetchUsers().then((el: User[]) => dispatch(getUsers(el)));
};

export const updateUserAsync = (id: string | number, user: User) => async (dispatch: AppDispatch) => {
  await fetchUpdateUser(id, user).then(() => dispatch(updateUser(user)));
};

export const getUserAsync = (id: string) => async (dispatch: AppDispatch) => {
  await fetchUser(id).then((el: User) => dispatch(setUser(el)));
};

export const deleteUserAsync = (id: string) => async (dispatch: AppDispatch) => {
  await fetchDeleteUser(id).then((el: User) => dispatch(deleteUser(el)));
};

export const createUserAsync =
  (user: { username: string; password: string; email: string }) => async (dispatch: AppDispatch) => {
    await fetchCreatUser(user).then((el: User) => dispatch(creatUser(el)));
  };

export default userSlice.reducer;
