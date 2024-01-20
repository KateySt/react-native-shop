import React from 'react';
import { GestureResponderEvent, Modal, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Checkbox } from '@/components/Checkbox';
import { COLORS, SPACING } from '@/theme/theme';

interface SideDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  status: (isChecked: boolean) => void;
}

const SideDrawerMenu: React.FC<SideDrawerMenuProps> = ({ isOpen, onClose, status }) => {
  return (
    <Modal transparent animationType="none" visible={isOpen} onRequestClose={onClose}>
      <View style={styles.drawer}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Icon name="times" size={24} color={COLORS.primaryWhiteHex} />
        </Pressable>
        <Checkbox onChangeStatus={status} name="only new" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 'auto',
    backgroundColor: COLORS.primaryBlackHex,
    padding: SPACING.space_16,
    width: '50%',
  },
  closeButton: {
    marginBottom: SPACING.space_10,
  },
  menuItem: {
    paddingVertical: SPACING.space_8,
  },
  menuItemText: {
    color: COLORS.primaryWhiteHex,
  },
});

export { SideDrawerMenu };
