import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { selectTheme, toggleTheme } from '@/features/ui/uiSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { FONTSIZE, SPACING } from '@/theme/theme';

const SettingsScreen = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const { icon } = useAdaptation();
  const screenTitleStyle = [styles.screenTitle, { color: icon }];
  const router = useRouter();
  const handelValueChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <View style={styles.container}>
      <Ionicons name="caret-back" size={24} color={icon} onPress={router.back} />
      <Text style={screenTitleStyle}>Settings Screen</Text>
      <Text style={screenTitleStyle}>{theme}</Text>
      <Switch value={theme === 'dark'} onValueChange={handelValueChange} />
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

export default SettingsScreen;
