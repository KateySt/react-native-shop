import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CardItem } from '@/components/CardItem';
import { SearchBar } from '@/components/SearchBar';
import { COLORS, SPACING } from '@/theme/theme';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  isNew: boolean;
}

const HomeScreen: React.FC = () => {
  const [originalData, setOriginalData] = useState<Product[]>([]);
  const [data, setData] = useState<Product[]>([]);
  const [text, setText] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);

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

  const getItems = ({ item }) => (
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchBar text={setText} status={setStatus} />
      <FlatList style={styles.listItemContainer} data={data} renderItem={getItems} />
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
