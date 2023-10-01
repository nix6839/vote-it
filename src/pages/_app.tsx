import '@/styles/globals.css';

import BaseLayout from '@/components/BaseLayout.tsx';
import {
  useSyncThemeAcrossInstances,
  useSyncThemeWithSystem,
} from '@/core/theme.tsx';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import type { AppProps } from 'next/app';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  await import('@tests/mocks/isomorphic-init.ts');
}

const queryClientConfig = {
  defaultOptions: {
    queries: {
      /**
       * With SSR, we usually want to set some default staleTime
       * above 0 to avoid refetching immediately on the client
       */
      staleTime: 60 * 1000,
    },
  },
};

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  useSyncThemeAcrossInstances();
  useSyncThemeWithSystem();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ReactQueryDevtools />
        <QueryErrorResetBoundary>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </QueryErrorResetBoundary>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
