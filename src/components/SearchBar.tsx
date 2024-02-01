import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, useColorScheme, View } from 'react-native';

import { CustomModal } from '@/components/CustomModal';
import { PressableComponent } from '@/components/PressableComponent';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { SearchBarProps } from '@/interface/SearchBarProps';
import { HomeStackParamList } from '@/navigation/native-stack/types';
import { COLORS, SPACING } from '@/theme/theme';

const SearchBar: React.FC<SearchBarProps> = ({ text }) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const isDark = useColorScheme() === 'dark';
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const handleSearch = (term: string) => {
    text(term);
  };

  const { searchTerm, handleSearch: debouncedHandleSearch, handleClose } = useDebouncedSearch(handleSearch);

  const showModal = (): void => {
    navigation.navigate('HeartScreen', { visible: true });
  };
  const showInput = (): void => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      handleClose();
    }
  };

  const inputStyle = [
    styles.input,
    { color: isDark ? COLORS.primaryWhiteHex : COLORS.secondaryBlackRGBA },
    { borderColor: isDark ? COLORS.secondaryLightGreyHex : COLORS.primaryBlackRGBA },
  ];

  const headerContainerStyle = [
    styles.headerContainer,
    { backgroundColor: isDark ? COLORS.primaryBlackHex : COLORS.primaryWhiteHex },
  ];

  const searchColor = isDark ? COLORS.primaryWhiteHex : COLORS.secondaryBlackRGBA;

  return (
    <View style={headerContainerStyle}>
      <View style={styles.container}>
        {isVisible && (
          <TextInput
            style={inputStyle}
            placeholder="Search..."
            value={searchTerm}
            onChangeText={debouncedHandleSearch}
            placeholderTextColor={COLORS.primaryLightGreyHex}
          />
        )}
        <View style={styles.rightIcons}>
          <PressableComponent onPress={showInput}>
            <Ionicons name="search" size={36} color={searchColor} />
          </PressableComponent>
          <PressableComponent onPress={showModal}>
            <Ionicons name="heart" size={36} color={COLORS.primaryRedHex} />
          </PressableComponent>
        </View>
      </View>
      <CustomModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
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
    paddingHorizontal: SPACING.space_20,
    marginTop: SPACING.space_4,
    marginBottom: SPACING.space_4,
  },
});

export { SearchBar };
