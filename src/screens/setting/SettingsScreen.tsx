import { StyleSheet, Text, View } from 'react-native';

import { useAdaptation } from '@/hooks/useAdaptation';
import { FONTSIZE, SPACING } from '@/theme/theme';

const SettingsScreen = () => {
  const { icon } = useAdaptation();
  const screenTitleStyle = [styles.screenTitle, { color: icon }];

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
