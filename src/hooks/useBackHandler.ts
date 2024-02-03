import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (callback: () => boolean) => {
  useEffect(() => {
    const handleBackPress = () => callback();

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [callback]);
};

export { useBackHandler };
