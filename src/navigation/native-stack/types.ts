import { NavigatorScreenParams } from '@react-navigation/native';
import { ComponentProps } from 'react';

import { Product } from '@/interface/Product';
import { TabParamList } from '@/navigation/bottom-tabs/types';
import { HomeStack } from '@/navigation/native-stack';

export type HomeStackParamList = {
  TabsGroup: NavigatorScreenParams<TabParamList>;
  ProductScreen: { productId: string };
  HeartScreen: { visible: boolean };
  ProductsScreen: {
    item: Product;
  };
};

export type HomeStackScreenOptions = ComponentProps<typeof HomeStack.Navigator>['screenOptions'];
