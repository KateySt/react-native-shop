import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAdaptation } from '@/hooks/useAdaptation';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { FONTSIZE, SPACING } from '@/theme/theme';

const Heart: React.FC = () => {
  const dimensions = useScreenDimensions();
  const { background, text, icon } = useAdaptation();
  const screenModalStyle = [
    styles.container,
    {
      backgroundColor: background,
      width: dimensions.width,
      height: dimensions.height,
    },
  ];
  const defaultTextColor = { color: text };
  const router = useRouter();

  return (
    <View style={screenModalStyle}>
      <Ionicons name="caret-back" size={24} color={icon} onPress={router.back} />
      <View>
        <Text style={[styles.text, defaultTextColor]}>Close me !</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
