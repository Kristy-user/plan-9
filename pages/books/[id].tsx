import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import BookImage from '../../Components/BookImage';
import { Book } from '../../types/interface';
const format_jpg: string = 'image/jpeg';

function CharacterPage({ character }: { character: Book }) {
  const router = useRouter();
  const { id, title, formats, authors, download_count, subjects } = character;
  return (
    <div className=" bg-gray-100 flex flex-center flex-col justify-center items-center justify-items-center content-center place-content-center pt-10 h-full">
      <div className="rounded-t-lg overflow-hidden w-96">
        <BookImage src={formats[format_jpg]} width={'100%'} height={'100%'} />
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
        {subjects.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    </div>
  );
}

CharacterPage.getLayout = function getLayout(page: typeof CharacterPage) {
  return <div>{page}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://gutendex.com/books/${context.query.id}`);
  const character = await res.json();

  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
