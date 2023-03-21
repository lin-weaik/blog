import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ChakraProvider } from '@chakra-ui/react'
import { NEXT_PUBLIC_CONVEX_URL } from '@/constants/const';

const convex = new ConvexReactClient(NEXT_PUBLIC_CONVEX_URL);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ConvexProvider client={convex}><Component {...pageProps} /></ConvexProvider>
    </ChakraProvider>
  )
}
