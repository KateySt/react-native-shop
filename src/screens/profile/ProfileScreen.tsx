import { StyleSheet, Text, useColorScheme, View } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import { COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const ProfileScreen = () => {
  const isDark = useColorScheme() === 'dark';
  const textStyle = { color: isDark ? COLORS.primaryWhiteHex : COLORS.primaryBlackHex };

  const screenTitleStyle = [styles.screenTitle, textStyle];

  return (
    <View style={styles.container}>
      <Text style={screenTitleStyle}>Profile Screen</Text>
      <Text style={textStyle}>Name: John Doe</Text>
      <PressableComponent>
        <Text style={textStyle}>Edit Profile</Text>
      </PressableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.space_16,
    marginTop: SPACING.space_24,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_24,
    marginTop: SPACING.space_8,
  },
});

export { ProfileScreen };
