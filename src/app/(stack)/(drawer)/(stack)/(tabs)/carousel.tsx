import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Slider from '@/components/Slider';
import Splash from '@/components/Splash';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getProductsAsync, selectProducts } from '@/features/product/productSlice';
import { useAdaptation } from '@/hooks/useAdaptation';

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
        <Splash />
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
