import { StyleSheet, Text, View } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import { useAdaptation } from '@/hooks/useAdaptation';
import { FONTSIZE, SPACING } from '@/theme/theme';

const ProfileScreen = () => {
  const { text } = useAdaptation();
  const textStyle = { color: text };
  return (
    <View style={styles.container}>
      <Text style={[styles.screenTitle, textStyle]}>Profile Screen</Text>
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
