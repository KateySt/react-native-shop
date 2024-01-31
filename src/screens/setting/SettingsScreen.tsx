import { View, Text, StyleSheet, useColorScheme } from 'react-native';

import { COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const SettingsScreen = () => {
  const isDark = useColorScheme() === 'dark';
  const screenTitleStyle = [styles.screenTitle, { color: isDark ? COLORS.primaryWhiteHex : COLORS.primaryBlackHex }];

  return (
    <View style={styles.container}>
      <Text style={screenTitleStyle}>Settings Screen</Text>
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

export { SettingsScreen };
