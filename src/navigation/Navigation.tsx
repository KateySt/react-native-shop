import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { useAdaptation } from '@/hooks/useAdaptation';
import { DrawerGroup } from '@/navigation/drawer';

export const Navigation = () => {
  const { theme } = useAdaptation();
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="auto" />
      <DrawerGroup />
    </NavigationContainer>
  );
};
