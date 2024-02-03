import { ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { store } from '@/features/store';
import { useAdaptation } from '@/hooks/useAdaptation';
import { drawerScreenOptions } from '@/navigation/drawer/options';

export { ErrorBoundary } from 'expo-router';

export default function Layout() {
  const { theme } = useAdaptation();
  return (
    <ThemeProvider value={theme}>
      <Provider store={store}>
        <StatusBar style="auto" />
        <GestureHandlerRootView style={styles.container}>
          <Drawer screenOptions={drawerScreenOptions}>
            <Drawer.Screen
              name="(drawer)/(stack)"
              options={{
                drawerLabel: 'Home',
              }}
            />
            <Drawer.Screen
              name="(drawer)/settings"
              options={{
                drawerLabel: 'Settings',
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
