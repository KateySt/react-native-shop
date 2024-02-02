import { Entypo, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import { useAdaptation } from '@/hooks/useAdaptation';
import { useOrientation } from '@/hooks/useOrientation';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { CartItemProps } from '@/interface/CartItemProps';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const CardItem: React.FC<CartItemProps> = ({ name, image, prices, description }) => {
  const screenDimensions = useScreenDimensions();
  const orientation = useOrientation();

  const windowWidth = screenDimensions.width;
  const numColumns = orientation === 'landscape' && windowWidth > 600 ? 2 : 1;
  const columnWidth = (windowWidth - SPACING.space_20 * (numColumns + 1)) / numColumns;

  const { background, text, icon } = useAdaptation();
  const screenCardStyle = [styles.card, { backgroundColor: background }, { shadowColor: icon }];
  return (
    <View style={[styles.cardContainer, { width: columnWidth }]}>
      <View style={screenCardStyle}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: text }]} numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Text>
          <Text style={[styles.price, { color: text }]}>${prices}</Text>
          <Text style={[styles.description, { color: text }]} numberOfLines={2} ellipsizeMode="tail">
            {description}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <PressableComponent>
            <Entypo name="shopping-cart" size={20} color={icon} />
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
