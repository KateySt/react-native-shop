import { useScrollToTop } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, Pressable, StyleSheet, View } from 'react-native';

import CardItem from '@/components/CardItem';
import { useAdaptation } from '@/hooks/useAdaptation';
import { useOrientation } from '@/hooks/useOrientation';
import { Product } from '@/interface/Product';
import { COLORS, SPACING } from '@/theme/theme';

const ListCardItems: React.FC<{ data: Product[] }> = ({ data }) => {
  const orientation = useOrientation();
  const numColumns = orientation === 'landscape' ? 2 : 1;
  const { background } = useAdaptation();
  const screenBackgroundStyle = [styles.safeArea, { backgroundColor: background }];
  const ref = useRef<FlatList>(null);
  const router = useRouter();
  const handlePress = (item: Product) => {
    router.push(`/(drawer)/(stack)/product/${item.id}`);
  };

  useScrollToTop(ref);

  const getItems: ListRenderItem<Product> = ({ item }) => {
    if (!item || !item.title) return null;
    return (
      <Pressable onPress={() => handlePress(item)} style={styles.itemContainer}>
        <CardItem data={item} />
      </Pressable>
    );
  };

  if (!data) {
    return (
      <View style={screenBackgroundStyle}>
        <ActivityIndicator size="large" color={COLORS.primaryVioletHex} />
      </View>
    );
  }

  return (
    <View style={screenBackgroundStyle}>
      {data && (
        <FlatList
          ref={ref}
          style={styles.listItemContainer}
          data={data}
          renderItem={getItems}
          numColumns={numColumns}
        />
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

export default ListCardItems;
