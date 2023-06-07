'use client';

import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { SWRConfig } from 'swr';

export default function Providers({ children }) {
  //

  // Use SWR
  const swrOptions = {
    refreshInterval: 30000,
    fetcher: async (...args) => {
      const res = await fetch(...args);
      if (!res.ok) {
        const errorDetails = await res.json();
        const error = new Error(errorDetails.message || 'An error occurred while fetching data.');
        error.description = errorDetails.description || 'No additional information was provided by the API.';
        error.status = res.status;
        throw error;
      }
      return res.json();
    },
  };

  // hook will return either 'dark' or 'light' on client
  // and always 'light' during ssr as window.matchMedia is not available
  const preferredColorScheme = useColorScheme();

  return (
    <SWRConfig value={swrOptions}>
      <MantineProvider theme={{ colorScheme: preferredColorScheme }} withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
    </SWRConfig>
  );
}
