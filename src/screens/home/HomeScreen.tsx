import React, { useEffect, useState } from 'react';
import { Button, FlatList, ListRenderItem, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CardItem } from '@/components/CardItem';
import { SearchBar } from '@/components/SearchBar';
import { COLORS, SPACING } from '@/theme/theme';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  isNew: boolean;
}

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
  const [originalData, setOriginalData] = useState<Product[]>([]);
  const [data, setData] = useState<Product[]>([]);
  const [text, setText] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((item: any, index: number) =>
          index % 2 === 0
            ? {
                ...item,
                isNew: true,
              }
            : {
                ...item,
                isNew: false,
              },
        );
        setOriginalData(newData);
        setData(newData);
      });
  }, []);

  useEffect(() => {
    if (!originalData.length) return;
    if (text.trim() === '') {
      setData(originalData);
    } else {
      setData(originalData.filter((el) => el.title.toLowerCase().includes(text.toLowerCase())));
    }
  }, [text, originalData]);

  useEffect(() => {
    if (!originalData.length) return;
    if (!status) {
      setData(originalData.filter((el) => el.isNew !== status));
    } else {
      setData(originalData);
    }
  }, [status]);
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const newItem = {
        id: originalData.length + 1,
        title: 'New Item',
        price: 10,
        description: 'Description of the new item',
        image: 'https://example.com/new_item.jpg',
        isNew: true,
      };
      setOriginalData([newItem, ...originalData]);
      setData([newItem, ...originalData]);
      setRefreshing(false);
    }, 3000);
  };

  const handleEndReached = () => {
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }, (_, index) => ({
        id: originalData.length + index + 1,
        title: `New Item ${index + 1}`,
        price: 10 + index,
        description: `Description of the new item ${index + 1}`,
        image: `https://example.com/new_item_${index + 1}.jpg`,
        isNew: true,
      }));
      setOriginalData([...originalData, ...newItems]);
      setData([...originalData, ...newItems]);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Button title="Go to Jane's profile" onPress={() => navigation.navigate('Carousel')} />
      <SearchBar text={setText} status={setStatus} />
      <FlatList
        style={styles.listItemContainer}
        data={data}
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
