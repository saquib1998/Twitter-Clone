import { GoogleOAuthProvider } from '@react-oauth/google'
import './globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>  
      <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId='314550840638-c5a37j16arhaffbgp0pi6mb7tm006q2l.apps.googleusercontent.com'>
        <Component {...pageProps} />
        <Toaster />
        < ReactQueryDevtools />
      </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
  )
}
