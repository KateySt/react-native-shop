import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Pressable, StyleSheet, useColorScheme } from 'react-native';

import { TabsGroupProps } from '@/navigation/bottom-tabs/types';
import { BORDERRADIUS, COLORS, SPACING } from '@/theme/theme';
const { height } = Dimensions.get('window');
export const ExploreHeaderLeft = () => {
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation<TabsGroupProps['navigation']>();
  const buttonStyle = [styles.container, { backgroundColor: isDark ? COLORS.primaryBlackHex : COLORS.primaryWhiteHex }];
  return (
    <Pressable onPress={navigation.openDrawer} style={buttonStyle}>
      <Entypo name="menu" size={24} color={COLORS.primaryVioletHex} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_8,
    position: 'absolute',
    top: '50%',
    marginTop: height / 2,
    zIndex: 1,
  },
});
