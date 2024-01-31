import React from 'react';
import { Animated, Dimensions, StyleSheet, useColorScheme, View } from 'react-native';

import { PaginationProps } from '@/interface/PaginationProps';
import { BORDERRADIUS, COLORS, SPACING } from '@/theme/theme';

const { width } = Dimensions.get('screen');

const Pagination: React.FC<PaginationProps> = ({ data, scrollX, index }) => {
  const isDark = useColorScheme() === 'dark';
  const dotStyle = { backgroundColor: isDark ? COLORS.primaryWhiteHex : COLORS.primaryBlackHex };

  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.1],
          extrapolate: 'clamp',
        });
        return <Animated.View key={idx.toString()} style={[styles.dot, dotStyle, { width: dotWidth, opacity }]} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: SPACING.space_36,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: BORDERRADIUS.radius_4,
    marginHorizontal: SPACING.space_2,
  },
});

export { Pagination };