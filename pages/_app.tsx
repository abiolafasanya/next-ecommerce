import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '../context/CartProvider';
import { ThemeProvider } from 'next-themes';
import { motion } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {MobileProvider } from '../context/MobileProvider'

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <CartProvider>
          <SessionProvider session={session}>
            <motion.div
              initial="pageInitial"
              animate="pageAnimate"
              variants={{
                pageInitial: { opacity: 0 },
                pageAnimate: { opacity: 1 },
              }}
              key={router.route}
            >
              <MobileProvider>
              <Component {...pageProps} />
              </MobileProvider>
            </motion.div>
          </SessionProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
