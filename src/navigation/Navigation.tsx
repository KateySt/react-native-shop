import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import { DrawerGroup } from '@/navigation/drawer';

export const Navigation = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <DrawerGroup />
    </NavigationContainer>
  );
};
