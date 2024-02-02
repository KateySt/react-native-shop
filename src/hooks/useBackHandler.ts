import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (onBackPress: any) => {
  useEffect(() => {
    const handleBackPress = () => {
      if (onBackPress && typeof onBackPress === 'function') {
        onBackPress();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [onBackPress]);
};

export { useBackHandler };
