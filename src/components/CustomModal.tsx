import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import { useAdaptation } from '@/hooks/useAdaptation';
import { COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const CustomModal: React.FC = ({ route }: any) => {
  const { background, text } = useAdaptation();
  const visible = route?.params;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const screenModalStyle = [styles.modalContent, { backgroundColor: background }];
  const defaultTextColor = { color: text };

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const closeModal = () => {
    setIsVisible(false);
    navigation.goBack();
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <PressableComponent style={[styles.container, styles.content]}>
        <View style={screenModalStyle}>
          <PressableComponent onPress={closeModal} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={COLORS.primaryBlackHex} />
          </PressableComponent>
          <Text style={[styles.text, defaultTextColor]}>Close me !</Text>
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
    height: '50%',
    width: '100%',
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
