import { Tabs } from 'expo-router';

import {
  carouselScreenOptions,
  productsScreenOptions,
  profileScreenOptions,
  tabScreenOptions,
} from '@/navigation/bottom-tabs/options';

const TabsGroup = () => (
  <Tabs screenOptions={tabScreenOptions}>
    <Tabs.Screen name="home" />
    <Tabs.Screen name="products" options={productsScreenOptions} />
    <Tabs.Screen name="carousel" options={carouselScreenOptions} />
    <Tabs.Screen name="profile" options={profileScreenOptions} />
  </Tabs>
);

export default TabsGroup;
