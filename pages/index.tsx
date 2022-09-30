import BookImage from '../Components/BookImage';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../Components/Spinner';
import { Book } from '../types/interface';
import SearchBox from '../Components/SearchBox';
import axios from 'axios';
import CheckBoxLang from '../Components/CheckBoxLang';

import Link from 'next/link';
import { BooksContext } from '../context/BooksContext';

const format_jpg: string = 'image/jpeg';

const Home = () => {
  const { books, setBooks, idWatchedBook, setIdWatchedBook } =
    useContext(BooksContext);
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
      .get(`https://gutendex.com/books?languages=${lang}&page=${currentPage}`)
      .then((res) => {
        setBooks(res.data.results);
        setLoading(false);
      });
  }, [lang, idWatchedBook]);

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
    <div className="md:mx-auto bg-gray-100 h-full">
      <div className ="sm:p-16 lg:p-32 p-5 object-center max-w-screen-xl mx-auto"> 
      <CheckBoxLang setLang={setLang} currentLang={lang} />
      <SearchBox setCurrentContent={setBooks} />
      </div>
      <div className="sm:p-16 lg:p-32 p-5 object-center max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4  gap-5 items-stretch place-content-center content-center">
          {loading ? (
            <Spinner />
          ) : books && books.length < 1 && !loading ? (
            <p>No results ....</p>
          ) : books ? (
            books.map((item: Book) => {
              const { id, title, formats, authors, download_count } = item;

              return (
                <Link href={`/books/[id]`} as={`/books/${id}`} key={id}>
                  <div
                    className={`bg-indigo-100 hover:bg-indigo-200 border shadow-xl hover:shadow-inner cursor-pointer rounded-lg p-3 min-h-200 ${
                      idWatchedBook.includes(id) ? 'opacity-25' : ''
                    }`}
                  >
                    <div className="rounded-t-lg overflow-hidden ">
                      <BookImage
                        src={formats[format_jpg]}
                        width={'100%'}
                        height={'100%'}
                        id={id}
                      />
                    </div>
                    <div className="mx-2 mt-4 w-full ">
                      <h2 className="font-bold text-xl text-amber-900 text-center">
                        {title}
                      </h2>
                      <p className="text-md text-left font-bold text-gray-600 align">
                        Authors :
                        <span className="font-normal">
                          {authors
                            .map((author) =>
                              author.name.split(',').reverse().join(' ')
                            )
                            .join(';')}
                        </span>
                      </p>
                      <p className="text-md font-bold text-gray-600 inline">
                        Download count :
                      </p>{' '}
                      <span className="font-normal text-gray-600">
                        {download_count}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
