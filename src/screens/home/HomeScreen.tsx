import React, { useEffect, useState } from 'react';
import { Button, FlatList, ListRenderItem, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/app/store';
import { CardItem } from '@/components/CardItem';
import { SearchBar } from '@/components/SearchBar';
import { getProductsAsync, selectProduct, setProductsAsync } from '@/features/product/productSlice';
import { Product } from '@/interface/Product';
import { COLORS, SPACING } from '@/theme/theme';

const getItems: ListRenderItem<Product> = ({ item }) => (
  <CardItem
    style={styles.itemContainer}
    id={item.id}
    name={item.title}
    image={item.image}
    prices={item.price}
    isNew={item.isNew}
    description={item.description}
  />
);
const HomeScreen: React.FC = ({ navigation }) => {
  const [text, setText] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
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

  useEffect(() => {
    if (!status) {
      dispatch(setProductsAsync(products.filter((el) => el.isNew !== status)));
    } else {
      dispatch(setProductsAsync(products));
    }
  }, [status]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const newItem = {
        id: products.length + 1,
        title: 'New Item',
        price: 10,
        description: 'Description of the new item',
        image: 'https://example.com/new_item.jpg',
        isNew: true,
      };
      dispatch(setProductsAsync([newItem, ...products]));
      setRefreshing(false);
    }, 3000);
  };

  const handleEndReached = () => {
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }, (_, index) => ({
        id: products.length + index + 1,
        title: `New Item ${index + 1}`,
        price: 10 + index,
        description: `Description of the new item ${index + 1}`,
        image: `https://example.com/new_item_${index + 1}.jpg`,
        isNew: true,
      }));
      dispatch(setProductsAsync([...products, ...newItems]));
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Button title="Go to Jane's profile" onPress={() => navigation.navigate('Carousel')} />
      <SearchBar text={setText} status={setStatus} />
      <FlatList
        style={styles.listItemContainer}
        data={products}
        renderItem={getItems}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
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
