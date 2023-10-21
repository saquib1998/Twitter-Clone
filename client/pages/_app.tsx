import { GoogleOAuthProvider } from '@react-oauth/google'
import './globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>  
      <GoogleOAuthProvider clientId='314550840638-c5a37j16arhaffbgp0pi6mb7tm006q2l.apps.googleusercontent.com'>
        <Component className={...pageProps} />
        <Toaster />
      </GoogleOAuthProvider>
    </div>
  )
}
