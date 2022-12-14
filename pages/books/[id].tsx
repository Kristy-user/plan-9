import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BookImage from '../../Components/BookImage';
import MainContainer from '../../Components/MainContainer';
import { Book } from '../../types/interface';
const format_jpg: string = 'image/jpeg';

interface BookItemPageProps {
  bookItem: Book;
}

function BookItemPage({ bookItem }: BookItemPageProps) {
  const router = useRouter();
  const { id, title, formats, authors, download_count, subjects } = bookItem;

  useEffect(() => {
    let booksId = JSON.parse(localStorage.getItem('id')) || [];

    if (!booksId.includes(router.query.id)) {
    }
    localStorage.setItem(
      'id',
      JSON.stringify([...booksId, Number(router.query.id)])
    );
  }, [id]);

  return (
    <MainContainer>
      <div className=" bg-gray-100 flex flex-center flex-col justify-center items-center justify-items-center content-center place-content-center pt-10 h-full">
        <div className="rounded-t-lg overflow-hidden w-96">
          <BookImage
            src={formats[format_jpg]}
            width={'100%'}
            height={'100%'}
            id={id}
          />
        </div>
        <div className="mx-2 mt-4 w-full text-center">
          <h2 className="font-bold text-xl text-amber-900 text-center">
            {title}
          </h2>
          <p className="text-md  font-bold text-gray-600 align">
            Authors :
            <span className="font-normal">
              {authors
                .map((author) => author.name.split(',').reverse().join(' '))
                .join(';')}
            </span>
          </p>
          <p className="text-md font-bold text-gray-600 inline">
            Download count :
          </p>{' '}
          <span className="font-normal text-gray-600">{download_count}</span>
          <p className="text-md font-bold pt-5 text-gray-600">Subjects:</p>{' '}
          {subjects ? subjects.map((item, i) => <p key={i}>{item}</p>) : null}
        </div>
      </div>
    </MainContainer>
  );
}
export default BookItemPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://gutendex.com/books/${context.query.id}`);
  const bookItem: Book = await res.json();
  return {
    props: {
      bookItem,
    },
  };
};
