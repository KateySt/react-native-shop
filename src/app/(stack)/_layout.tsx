import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';

import { useAdaptation } from '@/hooks/useAdaptation';
import { mainStackScreenOptions } from '@/navigation/native-stack/options';

const MainStackGroup = () => {
  const { theme } = useAdaptation();
  return (
    <ThemeProvider value={theme}>
      <Stack screenOptions={mainStackScreenOptions}>
        <Stack.Screen name="sing-in" />
        <Stack.Screen name="(drawer)" />
      </Stack>
    </ThemeProvider>
  );
};

export default MainStackGroup;
