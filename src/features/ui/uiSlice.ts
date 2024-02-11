import { createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/src/types/types-external';

import type { RootState } from '@/features/store';

export type ColorSchema = 'light' | 'dark';

export interface ThemeState {
  theme: ColorSchema;
}

const initialState: ThemeState = {
  theme: 'light',
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state: WritableDraft<ThemeState>) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { toggleTheme } = uiSlice.actions;

export const selectTheme = (state: RootState) => state.ui.theme;

export default uiSlice.reducer;
