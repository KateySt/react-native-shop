import React, { useEffect } from 'react';
import { Animated, Dimensions, Image, PanResponder, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/app/store';
import { StarRating } from '@/components/StarRating';
import { getProductAsync, selectProduct } from '@/features/product/productSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const panY = new Animated.Value(0);
const screenHeight = Dimensions.get('window').height;
const initialHeight = screenHeight * 0.7;
const ProductScreen: React.FC = ({ route }: any) => {
  const { productId } = route.params;
  const product = useSelector(selectProduct);
  const dispatch: AppDispatch = useDispatch();
  const { background, text } = useAdaptation();
  const modalStyle = [styles.modalContainer, { backgroundColor: background }];
  const textStyle = { color: text };
  useEffect(() => {
    dispatch(getProductAsync(productId));
  }, [productId]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newY = gestureState.dy < 0 ? 0 : gestureState.dy;
      Animated.spring(panY, { toValue: newY, useNativeDriver: false }).start();
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > screenHeight / 4) {
        Animated.timing(panY, { toValue: screenHeight / 2, useNativeDriver: false }).start();
      } else {
        Animated.spring(panY, { toValue: 0, useNativeDriver: false }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      {product && (
        <>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              modalStyle,
              {
                height: panY.interpolate({
                  inputRange: [0, initialHeight],
                  outputRange: [initialHeight, screenHeight / 2],
                }),
              },
              { transform: [{ translateY: panY }] },
            ]}>
            <ScrollView>
              <View>
                <Text style={[styles.name, textStyle]}>{product.title}</Text>
                <Text style={[styles.description, textStyle]}>{product.description}</Text>
                {product.category && (
                  <View style={styles.categoryContainer}>
                    <Text style={[styles.categoryText, textStyle]}>Categories:</Text>
                    <View style={styles.categoryTextContainer}>
                      <Text style={styles.categoryText}>{product.category}</Text>
                    </View>
                  </View>
                )}
                <View style={styles.ratingContainer}>
                  <StarRating rating={product.rating.rate} />
                  <Text style={[styles.ratingText, textStyle]}>({product.rating.count} ratings)</Text>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  name: {
    marginTop: SPACING.space_10,
    fontSize: FONTSIZE.size_24,
  },
  description: {
    marginTop: SPACING.space_20,
    fontSize: FONTSIZE.size_16,
  },
  modalContainer: {
    borderTopLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    padding: SPACING.space_16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  ratingContainer: {
    marginTop: SPACING.space_20,
  },
  ratingText: {
    fontSize: FONTSIZE.size_14,
    marginTop: SPACING.space_8,
  },
  categoryContainer: {
    marginTop: SPACING.space_20,
  },
  categoryText: {
    fontSize: FONTSIZE.size_16,
    padding: SPACING.space_4,
    color: COLORS.primaryWhiteHex,
  },
  categoryTextContainer: {
    backgroundColor: COLORS.primaryVioletHex,
    borderRadius: BORDERRADIUS.radius_10,
    alignSelf: 'flex-start',
  },
});

export { ProductScreen };
