// File: pages/_document.tsx

import { Html, Head, Main, NextScript } from 'next/document'

/**
 * Custom Document component
 * Sets up HTML structure, fonts, and global meta tags
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts - Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Global meta tags */}
        <meta name="theme-color" content="#0ea5e9" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
