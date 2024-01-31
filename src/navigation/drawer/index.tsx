import { createDrawerNavigator } from '@react-navigation/drawer';

import { drawerScreenOptions, settingsScreenOptions } from '@/navigation/drawer/options';
import { DrawerParamList } from '@/navigation/drawer/types';
import { HomeStackGroup } from '@/navigation/native-stack';
import { SettingsScreen } from '@/screens/setting/SettingsScreen';

export const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerGroup = () => (
  <Drawer.Navigator screenOptions={drawerScreenOptions}>
    <Drawer.Screen name="Home" component={HomeStackGroup} />
    <Drawer.Screen name="Settings" component={SettingsScreen} options={settingsScreenOptions} />
  </Drawer.Navigator>
);
