import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Slider from '@/components/Slider';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getProductsAsync, selectProducts } from '@/features/product/productSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { COLORS } from '@/theme/theme';

const CarouselScreen: React.FC = () => {
  const { background } = useAdaptation();
  const screenBackgroundStyle = [styles.safeArea, { backgroundColor: background }];
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProductsAsync());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={screenBackgroundStyle}>
        <ActivityIndicator size="large" color={COLORS.primaryVioletHex} />
      </View>
    );
  }

  return (
    <View style={screenBackgroundStyle}>
      <Slider data={products} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default CarouselScreen;
