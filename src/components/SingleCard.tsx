import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import { useAdaptation } from '@/hooks/useAdaptation';
import { BORDERRADIUS, SPACING } from '@/theme/theme';
const screenWidth = Dimensions.get('window').width;
const width = (screenWidth - 40) / 4;
interface Card {
  src: string;
  matched: boolean;
  id: number;
}

interface Props {
  card: Card;
  handleChoice: (card: { src: string; matched: boolean; id: number }) => void;
  flipped: boolean;
  disabled: boolean;
}

const SingleCard: React.FC<Props> = ({ card, handleChoice, flipped, disabled }) => {
  const { icon } = useAdaptation();

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <View style={styles.card}>
      <View>
        <Image
          source={{ uri: card.src }}
          style={[styles.front, flipped ? styles.flippedFront : null, { borderColor: icon }]}
        />
        <PressableComponent onPress={handleClick} disabled={disabled}>
          <Image
            source={require('./../../assets/shop.jpg')}
            style={[styles.back, flipped ? styles.flippedBack : null, { borderColor: icon }]}
          />
        </PressableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
  },
  front: {
    width,
    height: width,
    position: 'absolute',
    margin: SPACING.space_2,
    borderRadius: BORDERRADIUS.radius_4,
    borderWidth: SPACING.space_4,
    transform: [{ rotateY: '90deg' }],
  },
  back: {
    width,
    height: width,
    borderRadius: BORDERRADIUS.radius_4,
    borderWidth: SPACING.space_4,
    margin: SPACING.space_2,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotateY: '0deg' }],
  },
  flippedFront: {
    transform: [{ rotateY: '0deg' }],
  },
  flippedBack: {
    transform: [{ rotateY: '90deg' }],
  },
});

export default SingleCard;
