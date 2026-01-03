// File: pages/_app.tsx

import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import '@/styles/globals.css'

/**
 * Custom App component
 * Wraps all pages with the Layout component
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
