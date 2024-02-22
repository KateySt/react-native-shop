import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Product } from '@/interface/Product';
import { COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const CartProduct: React.FC<{ data: { quantity: string; product: Product } }> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.quantity}>{data.quantity}</Text>
      <Text style={styles.title}>{data.product.title}</Text>
      <Text style={styles.price}>{data.product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.space_10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondaryLightGreyHex,
  },
  quantity: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    marginRight: SPACING.space_10,
  },
  title: {
    flex: 1,
    fontSize: FONTSIZE.size_16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default CartProduct;
