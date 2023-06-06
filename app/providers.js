'use client';

import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

export default function Providers({ children }) {
  //

  // hook will return either 'dark' or 'light' on client
  // and always 'light' during ssr as window.matchMedia is not available
  const preferredColorScheme = useColorScheme();

  return (
    <MantineProvider theme={{ colorScheme: preferredColorScheme }} withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
}
