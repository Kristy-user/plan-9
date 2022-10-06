import '../styles/globals.css';
// import { BooksProvider } from '../context/BooksContext';

function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('VERSION', process.env.NEXT_PUBLIC_VERSION);
  }
  return (
    // <BooksProvider>
    <Component {...pageProps} />
    // </BooksProvider>
  );
}

export default MyApp;
