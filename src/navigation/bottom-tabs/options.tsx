import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

import { ExploreHeaderLeft } from '@/components/ExploreHeaderLeft';
import { TabScreenOptions } from '@/navigation/bottom-tabs/type';
import { COLORS } from '@/theme/theme';

export const tabScreenOptions: TabScreenOptions = ({ route }) => {
  const routeName = route.name;
  return {
    tabBarActiveTintColor: COLORS.primaryVioletHex,
    tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
    tabBarLabel: '',
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
        case 'cart': {
          iconName = focused ? 'cart' : 'cart-outline';
          break;
        }
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  };
};

export const cartScreenOptions = {
  tabBarLabel: 'Carts',
};
export const productsScreenOptions = {
  tabBarLabel: 'Products',
};

export const carouselScreenOptions = {
  tabBarLabel: 'Carousel',
};

export const profileScreenOptions = {
  headerLeft: ExploreHeaderLeft,
  headerShown: true,
  headerStyle: {
    height: 0,
  },
  tabBarLabel: 'Profile',
};
