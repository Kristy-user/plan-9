import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('VERSION', process.env.NEXT_PUBLIC_VERSION);
  }

  return (
    <>
      <Head>
        <title>Bookshelf</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
