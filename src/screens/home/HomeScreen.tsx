import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, ScrollView } from 'react-native';

import { CardItem } from '@/components/CardItem';
import { COLORS, SPACING } from '@/theme/theme';

const mockItemData = [
  {
    id: '1',
    name: 'Product 1',
    image: {
      uri: 'https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg',
    },
    prices: 5,
    isNew: true,
    description: 'Description for Product 1',
  },
  {
    id: '2',
    name: 'Product 2',
    image: {
      uri: 'https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg',
    },
    prices: 4,
    isNew: false,
    description: 'Description for Product 2',
  },
  {
    id: '3',
    name: 'Product 3',
    image: {
      uri: 'https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg',
    },
    prices: 10,
    isNew: false,
    description: 'Description for Product 3',
  },
  {
    id: '4',
    name: 'Product 4',
    image: {
      uri: 'https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg',
    },
    prices: 10,
    isNew: true,
    description: 'Description for Product 4',
  },
  {
    id: '5',
    name: 'Product 5',
    image: {
      uri: 'https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg',
    },
    prices: 10,
    isNew: true,
    description: 'Description for Product 5',
  },
];

const HomeScreen: React.FC<any> = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.listItemContainer}>
          {mockItemData.map((el, index) => (
            <CardItem
              style={styles.itemContainer}
              key={index}
              id={el.id}
              name={el.name}
              image={el.image}
              prices={el.prices}
              isNew={el.isNew}
              description={el.description}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: COLORS.primaryBlackHex,
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export { HomeScreen };
