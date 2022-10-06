import Spinner from './Spinner';
import { Book } from '../types/interface';
import BookItem from './BookItem';

interface BooksListProps {
  loading: boolean;
  books: Book[];
  idWatchedBook: number[];
}

const BooksList: React.FC<BooksListProps> = ({
  loading,
  books,
  idWatchedBook,
}) => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4  gap-5 items-stretch place-content-center content-center">
      {loading ? (
        <Spinner />
      ) : books && books.length < 1 && !loading ? (
        <p>No results ....</p>
      ) : books ? (
        books.map((item: Book) => {
          return (
            <BookItem key={item.id} book={item} idWatchedBook={idWatchedBook} />
          );
        })
      ) : null}
    </div>
  );
};

export default BooksList;
