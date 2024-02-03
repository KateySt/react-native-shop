import { Tabs } from 'expo-router';

import { ExploreHeaderLeft } from '@/components/ExploreHeaderLeft';
import { tabScreenOptions } from '@/navigation/bottom-tabs/options';

const TabsGroup = () => (
  <Tabs screenOptions={tabScreenOptions}>
    <Tabs.Screen
      name="home"
      options={{
        headerTitle: '',
        tabBarLabel: 'Home',
      }}
    />
    <Tabs.Screen
      name="products"
      options={{
        headerTitle: '',
        tabBarLabel: 'Products',
      }}
    />
    <Tabs.Screen
      name="carousel"
      options={{
        headerTitle: '',
        tabBarLabel: 'Carousel',
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        headerLeft: ExploreHeaderLeft,
        headerShown: true,
        headerStyle: {
          height: 0,
        },
        headerTitle: '',
        tabBarLabel: 'Profile',
      }}
    />
  </Tabs>
);

export default TabsGroup;
