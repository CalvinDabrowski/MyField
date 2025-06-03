import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nexfield.app',
  appName: 'NexField',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'never',
    backgroundColor: '#ffffff'
  },
  plugins: {
    StatusBar: {
      style: 'default',
      backgroundColor: '#ffffff'
    },
    SafeArea: {
      enabled: true
    }
  }
};

export default config;
