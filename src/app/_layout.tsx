import { ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { SessionProvider } from '@/components/providers/ctx';
import { store } from '@/features/store';
import { useAdaptation } from '@/hooks/useAdaptation';
import { drawerScreenOptions, homeScreenOptions, settingsScreenOptions } from '@/navigation/drawer/options';

export { ErrorBoundary } from 'expo-router';

export default function Layout() {
  const { theme } = useAdaptation();
  return (
    <ThemeProvider value={theme}>
      <SessionProvider>
        <Provider store={store}>
          <StatusBar style="auto" />
          <GestureHandlerRootView style={styles.container}>
            <Drawer screenOptions={drawerScreenOptions}>
              <Drawer.Screen name="(drawer)/(stack)" options={homeScreenOptions} />
              <Drawer.Screen name="(drawer)/settings" options={settingsScreenOptions} />
            </Drawer>
          </GestureHandlerRootView>
        </Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
