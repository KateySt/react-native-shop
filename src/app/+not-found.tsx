import { Link, router, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTSIZE, SPACING } from '@/theme/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText} onPress={() => router.replace('/home')}>
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_20,
  },
  title: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: SPACING.space_15,
    paddingVertical: SPACING.space_15,
  },
  linkText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryVioletHex,
  },
});
