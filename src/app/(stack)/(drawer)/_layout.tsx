import { Drawer } from 'expo-router/drawer';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { drawerScreenOptions, homeScreenOptions, settingsScreenOptions } from '@/navigation/drawer/options';

const LayoutContent = () => (
  <GestureHandlerRootView style={styles.container}>
    <Drawer screenOptions={drawerScreenOptions}>
      <Drawer.Screen name="(stack)" options={homeScreenOptions} />
      <Drawer.Screen name="settings" options={settingsScreenOptions} />
    </Drawer>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LayoutContent;
