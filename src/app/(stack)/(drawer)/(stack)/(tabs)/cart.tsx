import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import CartItem from '@/components/CartItem';
import { getCartsAsync, selectCart } from '@/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getProductsAsync } from '@/features/product/productSlice';
import { selectUser } from '@/features/user/userSlice';
import { COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const CartScreen: React.FC = () => {
  const carts = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartsAsync(user.id));
  }, [user]);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  return (
    <View style={styles.container}>
      {carts.length > 0 ? (
        <FlatList data={carts} renderItem={({ item }) => <CartItem data={item} />} />
      ) : (
        <Text style={styles.noCartsText}>No carts available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SPACING.space_16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCartsText: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryVioletHex,
    fontStyle: 'italic',
  },
});

export default CartScreen;
