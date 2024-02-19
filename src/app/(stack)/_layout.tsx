import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useAdaptation } from '@/hooks/useAdaptation';
import { mainStackScreenOptions } from '@/navigation/native-stack/options';

const MainStackGroup = () => {
  const { theme } = useAdaptation();
  return (
    <ThemeProvider value={theme}>
      <StatusBar style="auto" />
      <Stack screenOptions={mainStackScreenOptions}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="(drawer)" />
      </Stack>
    </ThemeProvider>
  );
};

export default MainStackGroup;
