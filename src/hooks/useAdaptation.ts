import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

import { COLORS } from '@/theme/theme';

interface AdaptationStyles {
  background: string;
  text: string;
  icon: string;
  borderColor: string;
  theme: Theme;
}

const useAdaptation = (): AdaptationStyles => {
  const isDark = useColorScheme() === 'dark';

  return {
    background: isDark ? COLORS.primaryDarkGreyHex : COLORS.primaryWhiteHex,
    text: isDark ? COLORS.primaryWhiteHex : COLORS.primaryDarkGreyHex,
    icon: isDark ? COLORS.primaryWhiteHex : COLORS.primaryBlackHex,
    borderColor: isDark ? COLORS.secondaryLightGreyHex : COLORS.primaryBlackHex,
    theme: isDark ? DarkTheme : DefaultTheme,
  };
};

export { useAdaptation };
