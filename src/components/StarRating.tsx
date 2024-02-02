import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAdaptation } from '@/hooks/useAdaptation';
import { COLORS } from '@/theme/theme';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const { icon } = useAdaptation();
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={25} color={COLORS.primaryYellowHex} />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key={stars.length} name="star-half" size={25} color={COLORS.primaryYellowHex} />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Ionicons key={stars.length + i} name="star-outline" size={25} color={icon} />);
    }

    return stars;
  };

  return <View style={styles.ratingContainer}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { StarRating };
