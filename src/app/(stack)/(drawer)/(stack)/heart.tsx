import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import ListProductItems from '@/components/ListProductItems';
import { useAppSelector } from '@/features/hooks';
import { selectLikes } from '@/features/product/productSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { FONTSIZE, SPACING } from '@/theme/theme';

const Heart: React.FC = () => {
  const dimensions = useScreenDimensions();
  const { background, icon } = useAdaptation();
  const screenModalStyle = [
    styles.container,
    {
      backgroundColor: background,
      width: dimensions.width,
      height: dimensions.height,
    },
  ];
  const router = useRouter();
  const likes = useAppSelector(selectLikes);

  return (
    <View style={screenModalStyle}>
      <Ionicons name="caret-back" size={24} color={icon} onPress={router.back} />
      <ListProductItems data={likes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: FONTSIZE.size_16,
  },
  pressableCustom: {
    padding: SPACING.space_8,
  },
  content: {
    justifyContent: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.space_4,
    right: SPACING.space_4,
    padding: SPACING.space_8,
  },
});

export default Heart;
