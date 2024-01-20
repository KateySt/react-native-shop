import React from 'react';
import { GestureResponderEvent, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLORS, FONTSIZE, SPACING } from '@/theme/theme';
interface CustomModalProps {
  isVisible: boolean;
  closeModal: () => void;
  content: string;
}
const CustomModal: React.FC<CustomModalProps> = ({ isVisible, closeModal, content }) => {
  const handleModalPress = (e: GestureResponderEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={closeModal}>
      <Pressable style={[styles.container, styles.content]} onPress={handleModalPress}>
        <View style={styles.modalContent}>
          <Text>{content}</Text>
          <Pressable onPress={closeModal} style={styles.closeButton}>
            <Icon name="times" size={24} color={COLORS.primaryBlackHex} />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: FONTSIZE.size_16,
  },
  pressableCustom: {
    padding: SPACING.space_8,
  },
  modalContent: {
    height: '50%',
    width: '100%',
    backgroundColor: COLORS.secondaryLightGreyHex,
    padding: SPACING.space_20,
    borderTopLeftRadius: SPACING.space_8,
    borderTopRightRadius: SPACING.space_8,
  },
  content: {
    justifyContent: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.space_4,
    right: SPACING.space_4,
    padding: SPACING.space_8,
  },
});

export { CustomModal };
