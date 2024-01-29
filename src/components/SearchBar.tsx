import { Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, TouchableNativeFeedback, View } from 'react-native';

import { CustomModal } from '@/components/CustomModal';
import { SideDrawerMenu } from '@/components/SideDrawerMenu';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { SearchBarProps } from '@/interface/SearchBarProps';
import { COLORS, SPACING } from '@/theme/theme';
const SearchBar: React.FC<SearchBarProps> = ({ text, status, navigation }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const handleSearch = (term: string) => {
    text(term);
  };

  const { searchTerm, handleSearch: debouncedHandleSearch, handleClose } = useDebouncedSearch(handleSearch);

  const showModal = (): void => {
    setModalVisible(true);
  };
  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };
  const hideModal = (): void => {
    setModalVisible(false);
  };
  const hideMenu = (): void => {
    setMenuVisible(false);
  };
  const showInput = (): void => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      handleClose();
    }
  };

  const PressableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : Pressable;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.container}>
        {isVisible && (
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchTerm}
            onChangeText={debouncedHandleSearch}
            placeholderTextColor={COLORS.primaryLightGreyHex}
          />
        )}
        <View style={styles.rightIcons}>
          <PressableComponent onPress={showInput}>
            <Icon name="search" size={36} color={COLORS.primaryWhiteHex} />
          </PressableComponent>
          <PressableComponent onPress={showModal}>
            <Icon name="favorite" size={36} color={COLORS.primaryRedHex} />
          </PressableComponent>
          <PressableComponent onPress={toggleMenu}>
            <Icon name="menu" size={36} color={COLORS.primaryWhiteHex} />
          </PressableComponent>
        </View>
      </View>
      <SideDrawerMenu isOpen={menuVisible} onClose={hideMenu} status={status} navigation={navigation} />
      <CustomModal isVisible={modalVisible} closeModal={hideModal} content="Close me !!!" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    color: COLORS.primaryWhiteHex,
    flex: 1,
    borderColor: COLORS.secondaryLightGreyHex,
    borderWidth: 1,
    borderRadius: SPACING.space_4,
    paddingLeft: SPACING.space_8,
    paddingRight: SPACING.space_8,
    marginRight: SPACING.space_8,
  },
  rightIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  headerContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: SPACING.space_20,
    marginTop: SPACING.space_4,
    marginBottom: SPACING.space_4,
  },
});

export { SearchBar };
