import { Platform, Pressable, TouchableNativeFeedback } from 'react-native';

export const PressableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : Pressable;
