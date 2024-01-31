import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Easing, useColorScheme } from 'react-native';

import { Product } from '@/interface/Product';
import { COLORS, FONTSIZE } from '@/theme/theme';

const { width, height } = Dimensions.get('screen');
const translateYImage = new Animated.Value(40);

Animated.timing(translateYImage, {
  toValue: 0,
  duration: 1000,
  useNativeDriver: true,
  easing: Easing.bounce,
}).start();
const SlideItem: React.FC<{ item: Product }> = ({ item }) => {
  const isDark = useColorScheme() === 'dark';
  const textStyle = { color: isDark ? COLORS.primaryWhiteHex : COLORS.primaryBlackHex };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: item.image }}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />
      <View style={styles.content}>
        <Text style={[styles.title, textStyle]} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={[styles.price, textStyle]}>$ {item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    flex: 0.6,
    width: '100%',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: FONTSIZE.size_28,
  },
  price: {
    fontSize: FONTSIZE.size_30,
    fontWeight: 'bold',
  },
});

export { SlideItem };
