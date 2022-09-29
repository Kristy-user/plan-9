import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('VERSION', process.env.NEXT_PUBLIC_VERSION);
  }
  return <Component {...pageProps} />;
}
