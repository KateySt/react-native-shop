import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

import { useAppSelector } from '@/features/hooks';
import { selectTheme } from '@/features/ui/uiSlice';
import { COLORS } from '@/theme/theme';

interface AdaptationStyles {
  background: string;
  text: string;
  icon: string;
  borderColor: string;
  theme: Theme;
}

const useAdaptation = (): AdaptationStyles => {
  const theme = useAppSelector(selectTheme);

  return {
    background: theme === 'dark' ? COLORS.primaryBlackHex : COLORS.primaryWhiteHex,
    text: theme === 'dark' ? COLORS.primaryWhiteHex : COLORS.primaryDarkGreyHex,
    icon: theme === 'dark' ? COLORS.primaryWhiteHex : COLORS.primaryBlackHex,
    borderColor: theme === 'dark' ? COLORS.secondaryLightGreyHex : COLORS.primaryBlackHex,
    theme: theme === 'dark' ? DarkTheme : DefaultTheme,
  };
};

export { useAdaptation };
