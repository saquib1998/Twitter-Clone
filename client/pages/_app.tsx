import { GoogleOAuthProvider } from '@react-oauth/google'
import './globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>  
      <GoogleOAuthProvider clientId='314550840638-c5a37j16arhaffbgp0pi6mb7tm006q2l.apps.googleusercontent.com'>
        <Component className={inter.className} {...pageProps} />
      </GoogleOAuthProvider>
    </div>
  )
}
