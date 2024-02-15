import { Entypo } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Dimensions, Pressable, StyleSheet } from 'react-native';

import { useAdaptation } from '@/hooks/useAdaptation';
import { BORDERRADIUS, COLORS, SPACING } from '@/theme/theme';

const { height } = Dimensions.get('window');
export const ExploreHeaderLeft = () => {
  const { background } = useAdaptation();
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const buttonStyle = [styles.container, { backgroundColor: background }];
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
