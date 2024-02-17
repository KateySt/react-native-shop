import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ListCardItems from '@/components/ListCardItems';
import SearchBar from '@/components/SearchBar';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getProductsAsync, selectProducts, setProductsAsync } from '@/features/product/productSlice';
import { useAdaptation } from '@/hooks/useAdaptation';

const ProductsScreen: React.FC = () => {
  const [text, setText] = useState<string>('');
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const { background } = useAdaptation();
  const screenBackgroundStyle = [styles.safeArea, { backgroundColor: background }];

  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  useEffect(() => {
    if (text.trim() === '') {
      dispatch(setProductsAsync());
    } else {
      dispatch(setProductsAsync(products.filter((el) => el.title.toLowerCase().includes(text.toLowerCase()))));
    }
  }, [text]);

  return (
    <View style={screenBackgroundStyle}>
      <SearchBar text={setText} />
      <ListCardItems data={products} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default ProductsScreen;
