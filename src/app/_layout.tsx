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

const LayoutContent = () => {
  const { theme } = useAdaptation();

  return (
    <ThemeProvider value={theme}>
      <StatusBar style="auto" />
      <GestureHandlerRootView style={styles.container}>
        <Drawer screenOptions={drawerScreenOptions}>
          <Drawer.Screen name="(drawer)/(stack)" options={homeScreenOptions} />
          <Drawer.Screen name="(drawer)/settings" options={settingsScreenOptions} />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default function Layout() {
  return (
    <SessionProvider>
      <Provider store={store}>
        <LayoutContent />
      </Provider>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
