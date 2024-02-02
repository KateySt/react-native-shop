import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type ScreenDimensions = {
  width: number;
  height: number;
};

const useScreenDimensions = (): ScreenDimensions => {
  const [screenDimensions, setScreenDimensions] = useState<ScreenDimensions>(Dimensions.get('window'));

  const handleScreenChange = ({ window }: { window: ScaledSize }) => {
    setScreenDimensions({ width: window.width, height: window.height });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleScreenChange);
  }, []);

  return screenDimensions;
};

export { useScreenDimensions };
