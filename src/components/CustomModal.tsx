import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLORS, FONTSIZE, SPACING } from '@/theme/theme';
interface CustomModalProps {
  isVisible: boolean;
  closeModal: () => void;
  content: string;
}
const CustomModal: React.FC<CustomModalProps> = ({ isVisible, closeModal, content }) => {
  return (
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={closeModal}>
      <View style={[styles.container, styles.content]}>
        <View style={styles.modalContent}>
          <Text>{content}</Text>
          <Pressable onPress={closeModal} style={styles.closeButton}>
            <Icon name="times" size={24} color={COLORS.primaryBlackHex} />
          </Pressable>
        </View>
      </View>
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
