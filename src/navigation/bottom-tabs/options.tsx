import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';

import { COLORS } from '@/theme/theme';

export const tabScreenOptions: ComponentProps<typeof Tabs>['screenOptions'] = ({ route }) => {
  const routeName = route.name;

  return {
    tabBarActiveTintColor: COLORS.primaryVioletHex,
    tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
    headerShown: false,
    tabBarIcon: ({ color, size, focused }) => {
      let iconName: ComponentProps<typeof Ionicons>['name'] = 'alert';

      switch (routeName) {
        case 'products': {
          iconName = focused ? 'albums' : 'albums-outline';
          break;
        }
        case 'profile': {
          iconName = focused ? 'person-circle' : 'person-circle-outline';
          break;
        }
        case 'carousel': {
          iconName = focused ? 'play' : 'stop';
          break;
        }
        case 'home': {
          iconName = focused ? 'home' : 'home-outline';
          break;
        }
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  };
};
