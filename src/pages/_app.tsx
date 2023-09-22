import '@/styles/globals.css';

import type { AppProps } from 'next/app';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  await import('../../tests/mocks/isomorphic-init.ts');
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
}
