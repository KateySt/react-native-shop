import { Entypo, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import { CartItemProps } from '@/interface/CartItemProps';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const windowWidth = Dimensions.get('window').width;
const numColumns = windowWidth > 600 ? 3 : 1;
const columnWidth = (windowWidth - SPACING.space_20 * (numColumns + 1)) / numColumns;
const CardItem: React.FC<CartItemProps> = ({ name, image, prices, description }) => {
  const isDark = useColorScheme() === 'dark';
  const screenCardStyle = [
    styles.card,
    { backgroundColor: isDark ? COLORS.primaryDarkGreyHex : COLORS.primaryDarkWhiteHex },
    { shadowColor: isDark ? COLORS.primaryWhiteHex : COLORS.primaryBlackHex },
  ];
  const defaultTextColor = [{ color: isDark ? COLORS.secondaryLightGreyHex : COLORS.secondaryBlackRGBA }];
  const shoppingCartColor = isDark ? COLORS.primaryWhiteHex : COLORS.secondaryBlackRGBA;
  return (
    <View style={styles.cardContainer}>
      <View style={screenCardStyle}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={[styles.name, defaultTextColor]} numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Text>
          <Text style={[styles.price, defaultTextColor]}>${prices}</Text>
          <Text style={[styles.description, defaultTextColor]} numberOfLines={2} ellipsizeMode="tail">
            {description}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <PressableComponent>
            <Entypo name="shopping-cart" size={20} color={shoppingCartColor} />
          </PressableComponent>
          <PressableComponent>
            <Ionicons name="heart" size={20} color={COLORS.primaryRedHex} />
          </PressableComponent>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: SPACING.space_10,
    width: columnWidth,
  },
  card: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: BORDERRADIUS.radius_10,
    elevation: 8,
    borderRadius: BORDERRADIUS.radius_10,
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: '100%',
    borderRadius: BORDERRADIUS.radius_10,
  },
  textContainer: {
    padding: BORDERRADIUS.radius_10,
    flex: 1,
  },
  name: {
    fontSize: FONTSIZE.size_16,
  },
  price: {
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_4,
  },
  description: {
    fontSize: FONTSIZE.size_14,
    marginTop: SPACING.space_4,
  },
  iconsContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: SPACING.space_8,
    top: SPACING.space_8,
    marginBottom: SPACING.space_15,
  },
});

export { CardItem };
