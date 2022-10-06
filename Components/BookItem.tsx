import { useState } from 'react';
import BookImage from './BookImage';
import Router from 'next/router';
import { Author } from '../types/interface';

const format_jpg: string = 'image/jpeg';

const BookItem = ({ book }) => {
  const [idWatchedBook, setIdWatchedBook] = useState<number[]>(booksId() || []);
  const { id, title, formats, authors, download_count } = book;

  function booksId() {
    if (typeof window !== 'undefined') {
      let idStorage = localStorage.getItem('id');
      return JSON.parse(idStorage);
    }
  }

  return (
    <div key={id} onClick={() => Router.push(`/books/${id}`)}>
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
                .map((author: Author) =>
                  author.name.split(',').reverse().join(' ')
                )
                .join(';')}
            </span>
          </p>
          <p className="text-md font-bold text-gray-600 inline">
            Download count :
          </p>
          <span className="font-normal text-gray-600">{download_count}</span>
        </div>
      </div>
    </div>
  );
};
export default BookItem;
