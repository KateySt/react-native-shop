import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

interface KeyboardState {
  isKeyboardVisible: boolean;
  keyboardHeight: number;
}

const useKeyboard = (): KeyboardState => {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    isKeyboardVisible: false,
    keyboardHeight: 0,
  });

  const handleKeyboardDidShow = (event: KeyboardEvent) => {
    setKeyboardState({
      isKeyboardVisible: true,
      keyboardHeight: event.endCoordinates.height,
    });
  };

  const handleKeyboardDidHide = () => {
    setKeyboardState({
      isKeyboardVisible: false,
      keyboardHeight: 0,
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardState;
};

export { useKeyboard };
