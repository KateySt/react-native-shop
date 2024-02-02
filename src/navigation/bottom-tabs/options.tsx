import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

import { ExploreHeaderLeft } from '@/navigation/bottom-tabs/components/ExploreHeaderLeft';
import { TabScreenOptions } from '@/navigation/bottom-tabs/types';
import { COLORS } from '@/theme/theme';

export const tabScreenOptions: TabScreenOptions = ({ route }) => {
  const routeName = route.name;

  return {
    tabBarActiveTintColor: COLORS.primaryVioletHex,
    tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
    headerShown: false,
    tabBarIcon: ({ color, size, focused }) => {
      let iconName: ComponentProps<typeof Ionicons>['name'] = 'alert';

      switch (routeName) {
        case 'Products': {
          iconName = focused ? 'albums' : 'albums-outline';
          break;
        }
        case 'Profile': {
          iconName = focused ? 'person-circle' : 'person-circle-outline';
          break;
        }
        case 'Carousel': {
          iconName = focused ? 'play' : 'stop';
          break;
        }
        case 'Home': {
          iconName = focused ? 'home' : 'home-outline';
          break;
        }
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  };
};

export const exploreScreenOptions: TabScreenOptions = {
  headerLeft: ExploreHeaderLeft,
  headerTitle: '',
  headerShown: true,
  headerStyle: {
    height: 0,
  },
};
