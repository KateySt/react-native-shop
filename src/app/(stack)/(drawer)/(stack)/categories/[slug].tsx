import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ListProductItems from '@/components/ListProductItems';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getProductsByCategoryAsync, selectProductsByCategory } from '@/features/product/productSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { FONTSIZE } from '@/theme/theme';

const CategoriesScreen: React.FC = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const products = useAppSelector(selectProductsByCategory);
  const dispatch = useAppDispatch();
  const { background, icon, text } = useAdaptation();
  const textStyle = [styles.text, { color: text }];
  const screenBackgroundStyle = [styles.safeArea, { backgroundColor: background }];
  const router = useRouter();
  useEffect(() => {
    dispatch(getProductsByCategoryAsync(slug));
  }, [slug]);

  return (
    <>
      <Ionicons name="caret-back" size={24} color={icon} onPress={() => router.push('/products')} />
      <View style={[screenBackgroundStyle, styles.container]}>
        <Text style={textStyle}>Category: {slug}</Text>
        <ListProductItems data={products} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: FONTSIZE.size_20,
  },
});

export default CategoriesScreen;
