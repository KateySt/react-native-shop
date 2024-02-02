import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FC } from 'react';

import { exploreScreenOptions, tabScreenOptions } from '@/navigation/bottom-tabs/options';
import { TabParamList, TabsGroupProps } from '@/navigation/bottom-tabs/types';
import { CarouselScreen } from '@/screens/carousel/CarouselScreen';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { ProductsScreen } from '@/screens/products/ProductsScreen';
import { ProfileScreen } from '@/screens/profile/ProfileScreen';

export const Tab = createBottomTabNavigator<TabParamList>();

export const TabsGroup: FC<TabsGroupProps> = () => (
  <Tab.Navigator screenOptions={tabScreenOptions}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Products" component={ProductsScreen} />
    <Tab.Screen name="Carousel" component={CarouselScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={exploreScreenOptions} />
  </Tab.Navigator>
);
