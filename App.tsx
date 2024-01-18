import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeScreen } from '@/screens/home/HomeScreen';
export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}
