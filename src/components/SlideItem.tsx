import React from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { Product } from '@/interface/Product';

const translateYImage = new Animated.Value(40);

Animated.timing(translateYImage, {
  toValue: 0,
  duration: 1000,
  useNativeDriver: true,
  easing: Easing.bounce,
}).start();
const SlideItem: React.FC<{ item: Product }> = ({ item }) => {
  const dimensions = useScreenDimensions();
  return (
    <View style={[styles.container, { width: dimensions.width, height: dimensions.height * 0.9 }]}>
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
          height: dimensions.height * 0.8,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default SlideItem;
