import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
          <link rel='manifest' href='/manifest.json' />
      </Head>
     
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
