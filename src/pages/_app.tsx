import '@/styles/globals.css';

import {
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

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <QueryErrorResetBoundary>
        <Component {...pageProps} />
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
