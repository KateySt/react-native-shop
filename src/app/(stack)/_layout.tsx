import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';

import { useAdaptation } from '@/hooks/useAdaptation';

const MainStackGroup = () => {
  const { theme } = useAdaptation();
  return (
    <ThemeProvider value={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sing-in" />
        <Stack.Screen name="(drawer)" />
      </Stack>
    </ThemeProvider>
  );
};

export default MainStackGroup;
