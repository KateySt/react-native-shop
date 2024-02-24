import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CartProduct from '@/components/CartProduct';
import { useAppSelector } from '@/features/hooks';
import { selectProducts } from '@/features/product/productSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { Order } from '@/interface/Order';
import { BORDERRADIUS, FONTSIZE, SPACING } from '@/theme/theme';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const CartItem: React.FC<{ data: Order }> = ({ data }) => {
  const products = useAppSelector(selectProducts);
  const { background, icon, text } = useAdaptation();

  const filteredProducts = data.products.map((product) => {
    const productInfo = products.find((info) => info.id === product.productId);
    return {
      ...product,
      product: productInfo,
    };
  });

  return (
    <>
      {products && (
        <View style={[styles.container, { backgroundColor: background, shadowColor: icon }]}>
          <Text style={[styles.date, { color: text }]}>{formatDate(data.date)}</Text>
          {filteredProducts.map((product) => (
            <View key={product.productId}>
              <CartProduct data={product} />
            </View>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_15,
    margin: SPACING.space_10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: BORDERRADIUS.radius_10,
    elevation: 8,
    position: 'relative',
  },
  date: {
    position: 'absolute',
    top: SPACING.space_10,
    right: SPACING.space_10,
    fontSize: FONTSIZE.size_8,
    marginBottom: SPACING.space_4,
  },
});

export default CartItem;
