import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { Book } from '../types/interface';

const BooksContext = createContext(undefined);

const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const [idWatchedBook, setIdWatchedBook] = useState<number[]>([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let idStorage = localStorage.getItem('id');
      idStorage ? setIdWatchedBook(JSON.parse(idStorage)) : null;
    }
  }, []);
  useEffect(() => {
    axios
      .get(`http://gutendex.com/books?languages=en`)
      .then((res) => {
        setBooks(res.data.results);
        books.forEach((book: Book) => (book.isShowed = false));
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);
  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        idWatchedBook,
        setIdWatchedBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
export { BooksContext, BooksProvider };
