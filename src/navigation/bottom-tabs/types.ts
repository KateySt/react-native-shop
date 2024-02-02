import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ComponentProps } from 'react';

import { Tab } from '@/navigation/bottom-tabs';
import { DrawerParamList } from '@/navigation/drawer/types';
import { HomeStackParamList } from '@/navigation/native-stack/types';

export type TabParamList = {
  Products: undefined;
  Profile: undefined;
  Carousel: undefined;
  Home: undefined;
};

export type TabsGroupProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'TabsGroup'>,
  DrawerScreenProps<DrawerParamList>
>;

export type TabScreenOptions = ComponentProps<typeof Tab.Navigator>['screenOptions'];
