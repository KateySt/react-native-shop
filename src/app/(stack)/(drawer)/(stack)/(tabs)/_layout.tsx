import { Tabs } from 'expo-router';

import {
  carouselScreenOptions,
  cartScreenOptions,
  productsScreenOptions,
  profileScreenOptions,
  tabScreenOptions,
} from '@/navigation/bottom-tabs/options';

const TabsGroup = () => (
  <Tabs screenOptions={tabScreenOptions}>
    <Tabs.Screen name="carousel" options={carouselScreenOptions} />
    <Tabs.Screen name="products" options={productsScreenOptions} />
    <Tabs.Screen name="cart" options={cartScreenOptions} />
    <Tabs.Screen name="profile" options={profileScreenOptions} />
  </Tabs>
);

export default TabsGroup;
