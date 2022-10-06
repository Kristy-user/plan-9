import { GetStaticProps, NextPageContext } from 'next';
import { useContext } from 'react';
import BookImage from '../Components/BookImage';
import MainContainer from '../Components/MainContainer';

import { BooksContext } from '../context/BooksContext';
import { Book } from '../types/interface';

const format_jpg: string = 'image/jpeg';

interface WatchedBooksProps {
  booksList: Book[];
  setB: Book[];
  idWatchedBook: number;
}

const WatchedBooks: React.FC<WatchedBooksProps> = ({ booksList }) => {
  const { idWatchedBook } = useContext(BooksContext);

  return (
    <MainContainer title={'Watched books'}>
      <div className="container grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4  gap-5 items-stretch place-content-center content-center">
        {booksList
          .filter((item: Book) => idWatchedBook.includes(item.id))
          .map((item: Book) => {
            const { id, title, formats, authors, download_count } = item;

            return (
              <div
                key={id}
                className={`bg-indigo-100 hover:bg-indigo-200 border shadow-xl hover:shadow-inner cursor-pointer rounded-lg p-3 min-h-200 
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
            );
          })}
      </div>
      <style jsx>
        {`
          .container {
            margin: 50px;
          }
        `}
      </style>
    </MainContainer>
  );
};
export default WatchedBooks;

export const getStaticProps: GetStaticProps = async (
  context: NextPageContext
) => {
  const res = await fetch(`https://gutendex.com/books?languages=en`);
  const answer = await res.json();
  const booksList = answer.results;
  return {
    props: { booksList },
  };
};
