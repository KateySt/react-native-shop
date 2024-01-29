import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { CartItemProps } from '@/interface/CartItemProps';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const CardItem: React.FC<CartItemProps> = ({ id, name, image, prices, isNew, description }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={[styles.name, styles.defaultTextColor]} numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Text>
          <Text>
            <Text style={!isNew ? styles.oldText : styles.newText}>new</Text>{' '}
            <Text style={isNew ? styles.oldText : styles.newText}>old</Text>
          </Text>
          <Text style={[styles.price, styles.defaultTextColor]}>${prices}</Text>
          <Text style={[styles.description, styles.defaultTextColor]} numberOfLines={2} ellipsizeMode="tail">
            {description}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          {isNew ? <Text style={styles.newTag}>New</Text> : <Text style={styles.oldTag}>Old</Text>}
          <TouchableOpacity>
            <Icon name="shopping-cart" size={20} color={COLORS.primaryWhiteHex} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="heart" size={20} color={COLORS.primaryRedHex} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: SPACING.space_10,
  },
  card: {
    shadowColor: COLORS.primaryWhiteHex,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: BORDERRADIUS.radius_10,
    elevation: 8,
    backgroundColor: COLORS.primaryDarkGreyHex,
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
  newTag: {
    backgroundColor: COLORS.primaryLightGreyHex,
    color: COLORS.primaryWhiteHex,
    paddingHorizontal: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_4,
  },
  oldTag: {
    backgroundColor: COLORS.secondaryDarkGreyHex,
    color: COLORS.primaryLightGreyHex,
    paddingHorizontal: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_4,
  },
  iconsContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: SPACING.space_8,
    top: SPACING.space_8,
    marginBottom: SPACING.space_15,
  },
  oldText: {
    textDecorationLine: 'line-through',
    color: COLORS.primaryLightGreyHex,
  },
  defaultTextColor: {
    color: COLORS.secondaryLightGreyHex,
  },
  newText: {
    color: COLORS.primaryWhiteHex,
  },
});

export { CardItem };
