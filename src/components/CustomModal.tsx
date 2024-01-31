import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { PressableComponent } from '@/components/PressableComponent';
import { COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const CustomModal: React.FC = ({ route }: any) => {
  const visible = route?.params;
  const isDark = useColorScheme() === 'dark';
  const [isVisible, setIsVisible] = useState<boolean>(false); // Set initial state to false
  const navigation = useNavigation();
  const screenModalStyle = [
    styles.modalContent,
    { backgroundColor: isDark ? COLORS.primaryDarkGreyHex : COLORS.primaryDarkWhiteHex },
  ];
  const defaultTextColor = { color: isDark ? COLORS.primaryWhiteHex : COLORS.primaryDarkGreyHex };

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
            <Icon name="times" size={24} color={COLORS.primaryBlackHex} />
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
