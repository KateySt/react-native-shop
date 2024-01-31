import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FC } from 'react';

import { exploreScreenOptions, tabScreenOptions } from '@/navigation/bottom-tabs/options';
import { TabParamList, TabsGroupProps } from '@/navigation/bottom-tabs/types';
import { CarouselScreen } from '@/screens/carousel/CarouselScreen';
import { ProductsScreen } from '@/screens/products/ProductsScreen';
import { ProfileScreen } from '@/screens/profile/ProfileScreen';

export const Tab = createBottomTabNavigator<TabParamList>();

export const TabsGroup: FC<TabsGroupProps> = () => (
  <Tab.Navigator screenOptions={tabScreenOptions}>
    <Tab.Screen name="Products" component={ProductsScreen} options={exploreScreenOptions} />
    <Tab.Screen name="Carousel" component={CarouselScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
