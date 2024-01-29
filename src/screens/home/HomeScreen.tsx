import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet } from 'react-native';
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
      isNew={item.isNew}
      description={item.description}
    />
  );
};
const HomeScreen: React.FC = ({ navigation }: any) => {
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
      const newItem: Product = {
        id: products.length + Date.now(),
        title: 'New Item',
        price: 10,
        description: 'Description of the new item',
        image:
          'https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg',
        isNew: true,
      };
      dispatch(setProductsAsync([newItem, ...products]));
      setRefreshing(false);
    }, 3000);
  };

  const handleEndReached = () => {
    setTimeout(() => {
      const newItems: Product[] = Array.from({ length: 5 }, (_, index) => ({
        id: products.length + Date.now(),
        title: `New Item ${index + 1}`,
        price: 10 + index,
        description: `Description of the new item ${index + 1}`,
        image: `https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg`,
        isNew: true,
      }));
      dispatch(setProductsAsync([...products, ...newItems]));
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchBar text={setText} status={setStatus} navigation={navigation} />
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
