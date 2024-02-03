import { useScrollToTop } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, Pressable, StyleSheet, View } from 'react-native';

import CardItem from '@/components/CardItem';
import SearchBar from '@/components/SearchBar';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getProductsAsync, selectProducts, setProductsAsync } from '@/features/product/productSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { useOrientation } from '@/hooks/useOrientation';
import { Product } from '@/interface/Product';
import { COLORS, SPACING } from '@/theme/theme';

const ProductsScreen: React.FC = () => {
  const orientation = useOrientation();
  const numColumns = orientation === 'landscape' ? 2 : 1;
  const [text, setText] = useState<string>('');
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const { background } = useAdaptation();
  const screenBackgroundStyle = [styles.safeArea, { backgroundColor: background }];
  const ref = useRef<FlatList>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handlePress = (item: Product) => {
    router.push(`/(drawer)/(stack)/product/${item.id}`);
  };

  useScrollToTop(ref);

  useEffect(() => {
    dispatch(getProductsAsync());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (text.trim() === '') {
      dispatch(setProductsAsync());
    } else {
      dispatch(setProductsAsync(products.filter((el) => el.title.toLowerCase().includes(text.toLowerCase()))));
    }
  }, [text]);

  const getItems: ListRenderItem<Product> = ({ item }) => {
    if (!item || !item.id) return null;
    return (
      <Pressable onPress={() => handlePress(item)} style={styles.itemContainer}>
        <CardItem name={item.title} image={item.image} prices={item.price} description={item.description} />
      </Pressable>
    );
  };

  if (loading) {
    return (
      <View style={screenBackgroundStyle}>
        <ActivityIndicator size="large" color={COLORS.primaryVioletHex} />
      </View>
    );
  }

  return (
    <View style={screenBackgroundStyle}>
      {products && (
        <>
          <SearchBar text={setText} />
          <FlatList
            ref={ref}
            style={styles.listItemContainer}
            data={products}
            renderItem={getItems}
            numColumns={numColumns}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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

export default ProductsScreen;
