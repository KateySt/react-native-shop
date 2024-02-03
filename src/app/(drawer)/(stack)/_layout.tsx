import { Stack } from 'expo-router';

import { heartScreenOptions, homeStackScreenOptions, productScreenOptions } from '@/navigation/native-stack/options';

const HomeStackGroup = () => (
  <Stack screenOptions={homeStackScreenOptions}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="product/[slug]" options={productScreenOptions} />
    <Stack.Screen name="heart" options={heartScreenOptions} />
  </Stack>
);

export default HomeStackGroup;
