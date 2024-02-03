import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';
import { ComponentProps } from 'react';

export const homeStackScreenOptions: ComponentProps<typeof Stack>['screenOptions'] = {
  headerShown: false,
};

export const productScreenOptions: NativeStackNavigationOptions = {
  presentation: 'modal',
  headerTitle: '',
};
export const heartScreenOptions: NativeStackNavigationOptions = {
  presentation: 'modal',
  headerTitle: '',
};
