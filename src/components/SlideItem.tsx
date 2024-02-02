import React from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { useAdaptation } from '@/hooks/useAdaptation';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { Product } from '@/interface/Product';
import { FONTSIZE } from '@/theme/theme';

const translateYImage = new Animated.Value(40);

Animated.timing(translateYImage, {
  toValue: 0,
  duration: 1000,
  useNativeDriver: true,
  easing: Easing.bounce,
}).start();
const SlideItem: React.FC<{ item: Product }> = ({ item }) => {
  const { text } = useAdaptation();
  const dimensions = useScreenDimensions();
  return (
    <View style={[styles.container, { width: dimensions.width }]}>
      <Animated.Image
        source={{ uri: item.image }}
        resizeMode="contain"
        style={{
          transform: [
            {
              translateY: translateYImage,
            },
          ],
          width: dimensions.width,
          height: dimensions.height,
        }}
      />
      <View style={[styles.content, { width: dimensions.width }]}>
        <Text style={[styles.title, { color: text }]} numberOfLines={2} ellipsizeMode="tail">
          {item && item.title ? (item.title.length > 50 ? `${item.title.slice(0, 50)}...` : item.title) : ''}
        </Text>
        <Text style={[styles.price, { color: text }]}>$ {item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  content: {
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
