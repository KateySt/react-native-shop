import LottieView from 'lottie-react-native';
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';

import { COLORS } from '@/theme/theme';

export default function Splash() {
  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <ActivityIndicator size="large" color={COLORS.primaryVioletHex} />
      ) : (
        <LottieView autoPlay resizeMode="cover" source={require('../../assets/loading.json')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
});
