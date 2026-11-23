import { useCallback, useState } from 'react';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';

import StartupSplash from '@/components/startup-splash';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  const finishSplash = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      {showSplash ? (
        <StartupSplash onFinish={finishSplash} />
      ) : (
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#F4FAF7',
            },
          }}
        />
      )}
    </ThemeProvider>
  );
}