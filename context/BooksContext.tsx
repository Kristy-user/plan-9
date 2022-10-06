import { createContext, useEffect, useState } from 'react';

const BooksContext = createContext(undefined);

const BooksProvider = ({ children }) => {
  const [idWatchedBook, setIdWatchedBook] = useState<number[]>([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let idStorage = localStorage.getItem('id');
      idStorage ? setIdWatchedBook(JSON.parse(idStorage)) : null;
    }
  }, []);

  return (
    <BooksContext.Provider
      value={{
        idWatchedBook,
        setIdWatchedBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
export { BooksContext, BooksProvider };
