import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, ListRenderItem, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/app/store';
import { CardItem } from '@/components/CardItem';
import { SearchBar } from '@/components/SearchBar';
import { getProductsAsync, selectProducts, setProductsAsync } from '@/features/product/productSlice';
import { Product } from '@/interface/Product';
import { HomeStackParamList } from '@/navigation/native-stack/types';
import { COLORS, SPACING } from '@/theme/theme';

const windowWidth = Dimensions.get('window').width;
const numColumns = windowWidth > 600 ? 3 : 1;
const ProductsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [text, setText] = useState<string>('');
  const products = useSelector(selectProducts);
  const dispatch: AppDispatch = useDispatch();
  const isDark = useColorScheme() === 'dark';
  const screenBackgroundStyle = [
    styles.safeArea,
    { backgroundColor: isDark ? COLORS.primaryBlackHex : COLORS.primaryWhiteHex },
  ];
  const ref = useRef<FlatList>(null);

  useScrollToTop(ref);

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

  const handlePress = (item: Product) => {
    navigation.navigate('ProductScreen', { productId: `${item.id}` });
  };

  const getItems: ListRenderItem<Product> = ({ item }) => {
    if (!item || !item.id) return null;
    return (
      <Pressable onPress={() => handlePress(item)}>
        <CardItem
          style={styles.itemContainer}
          name={item.title}
          image={item.image}
          prices={item.price}
          description={item.description}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={screenBackgroundStyle}>
      <SearchBar text={setText} />
      {products && (
        <FlatList
          ref={ref}
          style={styles.listItemContainer}
          data={products}
          renderItem={getItems}
          numColumns={numColumns}
        />
      )}
    </SafeAreaView>
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

export { ProductsScreen };
