import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { NationalityProvider } from '@/providers/nationalityProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NationalityProvider>
      <Component {...pageProps} />
    </NationalityProvider>
  )
}
