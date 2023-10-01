import { initThemeInlineScript } from '@/core/theme.tsx';
import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <Script id="init-theme" strategy="beforeInteractive">
          {initThemeInlineScript}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
