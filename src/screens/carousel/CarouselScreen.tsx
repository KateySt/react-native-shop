import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/app/store';
import { Slider } from '@/components/Slider';
import { getProductsAsync, selectProducts } from '@/features/product/productSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { Product } from '@/interface/Product';

const CarouselScreen: React.FC = () => {
  const { background } = useAdaptation();
  const screenBackgroundStyle = [styles.safeArea, { backgroundColor: background }];
  const products: Product[] = useSelector(selectProducts);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  return (
    <SafeAreaView style={screenBackgroundStyle}>
      <ScrollView>
        <Slider data={products} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export { CarouselScreen };
