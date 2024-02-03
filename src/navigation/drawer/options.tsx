import { Drawer } from 'expo-router/drawer';
import { ComponentProps } from 'react';

import { COLORS } from '@/theme/theme';

export const drawerScreenOptions: ComponentProps<typeof Drawer>['screenOptions'] = {
  headerShown: false,
  drawerActiveTintColor: COLORS.primaryVioletHex,
  drawerInactiveTintColor: COLORS.primaryLightGreyHex,
};

export const homeScreenOptions = {
  drawerLabel: 'Home',
};

export const settingsScreenOptions = {
  drawerLabel: 'Settings',
};
