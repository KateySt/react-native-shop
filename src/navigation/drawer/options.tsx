import { DrawerScreenOptions } from './types';

import { COLORS } from '@/theme/theme';

export const drawerScreenOptions: DrawerScreenOptions = {
  headerShown: false,
  drawerActiveTintColor: COLORS.primaryVioletHex,
  drawerInactiveTintColor: COLORS.primaryLightGreyHex,
};
export const settingsScreenOptions: DrawerScreenOptions = {
  title: 'Settings',
};
