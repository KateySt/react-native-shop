import { NavigatorScreenParams } from '@react-navigation/native';
import { ComponentProps } from 'react';

import { Drawer } from '@/navigation/drawer';
import { HomeStackParamList } from '@/navigation/native-stack/types';

export type DrawerParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}

export type DrawerScreenOptions = ComponentProps<typeof Drawer.Navigator>['screenOptions'];
