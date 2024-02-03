import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import { useAdaptation } from '@/hooks/useAdaptation';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { CustomModalProps } from '@/interface/CustomModalProps';
import { COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, closeModal, content }) => {
  const { icon, background, text } = useAdaptation();
  const dimensions = useScreenDimensions();

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <PressableComponent style={[styles.container, styles.content]}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: background, width: dimensions.width, height: dimensions.height * 0.5 },
          ]}>
          <Text style={[styles.text, { color: text }]}>{content}</Text>
          <PressableComponent onPress={closeModal} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={icon} />
          </PressableComponent>
        </View>
      </PressableComponent>
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

export default CustomModal;
