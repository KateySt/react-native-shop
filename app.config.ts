import 'ts-node/register';
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  plugins: ['expo-router'],
  scheme: 'your-app-scheme',
  name: 'shop',
  slug: 'shop',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#6c0073',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#6c0073',
    },
  },
  web: {
    favicon: './assets/shop.jpg',
    bundler: 'metro',
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
};

export default config;
