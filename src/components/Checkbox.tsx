import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLORS, SPACING } from '@/theme/theme';

interface CheckboxProps {
  onChangeStatus: (isChecked: boolean) => void;
  name: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChangeStatus, name }) => {
  const [isChecked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!isChecked);
    onChangeStatus(isChecked);
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer}>
      {isChecked ? (
        <Icon name="check-square" size={24} color={COLORS.primaryWhiteHex} />
      ) : (
        <Icon name="square" size={24} color={COLORS.primaryWhiteHex} />
      )}
      <Text style={styles.checkboxLabel}>{name}</Text>
    </TouchableOpacity>
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
