import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/app/store';
import { CardItem } from '@/components/CardItem';
import { SearchBar } from '@/components/SearchBar';
import { getProductsAsync, selectProduct, setProductsAsync } from '@/features/product/productSlice';
import { Product } from '@/interface/Product';
import { COLORS, SPACING } from '@/theme/theme';

const getItems: ListRenderItem<Product> = ({ item }) => {
  if (!item || !item.id) return null;
  return (
    <CardItem
      style={styles.itemContainer}
      id={item.id}
      name={item.title}
      image={item.image}
      prices={item.price}
      description={item.description}
    />
  );
};
const HomeScreen: React.FC = ({ navigation }: any) => {
  const [text, setText] = useState<string>('');
  const products = useSelector(selectProduct);
  const dispatch: AppDispatch = useDispatch();

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
    <SafeAreaView style={styles.safeArea}>
      <SearchBar text={setText} navigation={navigation} />
      <FlatList style={styles.listItemContainer} data={products} renderItem={getItems} onEndReachedThreshold={0.1} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
    zIndex: 0,
  },
});

export { HomeScreen };
