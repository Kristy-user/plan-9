import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('VERSION', process.env.NEXT_PUBLIC_VERSION);
  }
  return <Component {...pageProps} />;
}

export default MyApp;
