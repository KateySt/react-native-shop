import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type Orientation = 'portrait' | 'landscape';

const getOrientation = (dimensions: ScaledSize): Orientation => {
  return dimensions.height > dimensions.width ? 'portrait' : 'landscape';
};

const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation(Dimensions.get('window')));

  const handleOrientationChange = ({ window }: { window: ScaledSize }) => {
    setOrientation(getOrientation(window));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleOrientationChange);
  }, []);

  return orientation;
};

export { useOrientation };
