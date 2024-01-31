import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Slider } from '@/components/Slider';
import { COLORS } from '@/theme/theme';

const CarouselScreen: React.FC = () => {
  const isDark = useColorScheme() === 'dark';
  const screenBackgroundStyle = [
    styles.safeArea,
    { backgroundColor: isDark ? COLORS.primaryBlackHex : COLORS.primaryWhiteHex },
  ];
  return (
    <SafeAreaView style={screenBackgroundStyle}>
      <Slider />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export { CarouselScreen };
