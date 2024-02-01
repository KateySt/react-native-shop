import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, useColorScheme } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import { CheckboxProps } from '@/interface/CheckboxProps';
import { COLORS, SPACING } from '@/theme/theme';

const Checkbox: React.FC<CheckboxProps> = ({ onChangeStatus, name }) => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const isDark = useColorScheme() === 'dark';
  const checkboxColor = isDark ? COLORS.primaryWhiteHex : COLORS.secondaryBlackRGBA;

  const toggleCheckbox = () => {
    setChecked(!isChecked);
    onChangeStatus(isChecked);
  };

  return (
    <PressableComponent onPress={toggleCheckbox} style={styles.checkboxContainer}>
      {isChecked ? (
        <Entypo name="squared-plus" size={24} color={checkboxColor} />
      ) : (
        <Entypo name="squared-minus" size={24} color={checkboxColor} />
      )}
      <Text style={styles.checkboxLabel}>{name}</Text>
    </PressableComponent>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.space_8,
  },
  checkboxLabel: {
    marginLeft: SPACING.space_8,
    color: COLORS.primaryWhiteHex,
  },
});

export { Checkbox };
