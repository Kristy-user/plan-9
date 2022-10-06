import { useContext, useEffect, useState } from 'react';
import SearchBox from '../Components/SearchBox';
import axios from 'axios';
import CheckBoxLang from '../Components/CheckBoxLang';
import { BooksContext } from '../context/BooksContext';
import BooksList from '../Components/BookList';
import MainContainer from '../Components/MainContainer';
import { GetStaticProps, NextPageContext } from 'next';
import { Book } from '../types/interface';

const Home = ({ booksList }) => {
  const { idWatchedBook, setIdWatchedBook } = useContext(BooksContext);
  const [books, setBooks] = useState(booksList.results);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [lang, setLang] = useState<string>('en');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`https://gutendex.com/books?languages=${lang}&page=${currentPage}`)
      .then((res) => {
        setBooks([...books, ...res.data.results]);
        setCurrentPage((prev) => prev + 1);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [fetching]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://gutendex.com/books?languages=${lang}&page=1`)
      .then((res) => {
        setBooks(res.data.results);
        setLoading(false);
      });
  }, [lang]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    let idStorage = localStorage.getItem('id');
    setIdWatchedBook(idStorage ? JSON.parse(idStorage) : []);
  }, []);

  return (
    <MainContainer>
      <div className="md:mx-auto bg-gray-100 h-full">
        <div className="header sm:p-16 lg:p-32 p-5 object-center max-w-screen-xl mx-auto">
          <CheckBoxLang setLang={setLang} currentLang={lang} />
          <SearchBox setCurrentContent={setBooks} />
        </div>

        <div className="sm:p-16 lg:p-32 p-5 object-center max-w-screen-xl mx-auto">
          <BooksList
            loading={loading}
            books={books}
            idWatchedBook={idWatchedBook}
          />
        </div>
      </div>
    </MainContainer>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (
  context: NextPageContext
) => {
  const res = await fetch(`https://gutendex.com/books?languages=en`);
  const booksList = await res.json();

  return {
    props: { booksList },
  };
};
