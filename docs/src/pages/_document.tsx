import { getSandpackCssText } from '@codesandbox/sandpack-react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="stylesheet" href="https://static.toss.im/tps/main.css" />
        <link rel="stylesheet" href="https://static.toss.im/tps/others.css" />
        <style dangerouslySetInnerHTML={{ __html: getSandpackCssText() }} id="sandpack" key="sandpack-css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
