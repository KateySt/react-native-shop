import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CustomModal } from '@/components/CustomModal';
import { TabsGroup } from '@/navigation/bottom-tabs';
import { heartScreenOptions, homeStackScreenOptions, productScreenOptions } from '@/navigation/native-stack/options';
import { HomeStackParamList } from '@/navigation/native-stack/types';
import { ProductScreen } from '@/screens/product/ProductScreen';
import { ProductsScreen } from '@/screens/products/ProductsScreen';

export const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackGroup = () => (
  <HomeStack.Navigator screenOptions={homeStackScreenOptions}>
    <HomeStack.Screen name="TabsGroup" component={TabsGroup} />
    <HomeStack.Screen name="HeartScreen" component={CustomModal} options={heartScreenOptions} />
    <HomeStack.Screen name="ProductScreen" component={ProductScreen} options={productScreenOptions} />
    <HomeStack.Screen name="ProductsScreen" component={ProductsScreen} />
  </HomeStack.Navigator>
);
