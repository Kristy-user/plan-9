import BookImage from '../Components/BookImage';
import { useState } from 'react';
import Spinner from '../Components/Spinner';
import { Book } from '../types/interface';

const format_jpg: string = 'image/jpeg';

const Home = ({ content }) => {
  const [keyword, setKeyword] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentContent, setCurrentContent] = useState<Book[]>(content.results);

  const getResults = async () => {
    try {
      setCurrentContent(null);
      setLoading(true);
      const res = await fetch(`https://gutendex.com/books?search=${keyword}`);
      const content = await res.json();
      setCurrentContent(content.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className=" md:mx-auto bg-gray-100">
      <div className="">
        <h2 className="text-2xl font-bold text-primary mb-1 text-center pt-10">
          <span className="text-active">Books</span> Search
        </h2>

        <form
          className="sm:mx-auto mt-10 justify-center sm:w-full sm:flex mb-4"
          onSubmit={(e) => {
            getResults();
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <input
            type="text"
            className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-semibold  border border-slate-300 focus:outline-none focus:ring-2 focus:ring-active"
            placeholder="Enter the book's title"
            defaultValue={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />

          <div className="mt-4 sm:mt-0 sm:ml-3">
            <button
              className="block w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold border-2 border-slate-300 hover:border-indigo-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary sm:px-10"
              type="submit"
            >
              {loading ? (
                <span className="animate-pulse">Loading..</span>
              ) : (
                <>Search</>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="sm:p-16 lg:p-32 p-5 object-center max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4  gap-5 items-stretch place-content-center">
          {!currentContent ? (
            <Spinner />
          ) : currentContent.length < 1 ? (
            <p>No results ....</p>
          ) : (
            currentContent.map((character: Book) => {
              const { id, title, formats, authors, download_count } = character;
              return (
                <div
                  key={id}
                  className="bg-indigo-100 hover:bg-indigo-200 border shadow-xl hover:shadow-inner cursor-pointer rounded-lg p-3 min-h-200 "
                >
                  <div className="rounded-t-lg overflow-hidden ">
                    <BookImage
                      src={formats[format_jpg]}
                      width={'100%'}
                      height={'100%'}
                    />
                  </div>
                  <div className="mx-2 mt-4 w-full text-center">
                    <h2 className="font-bold text-xl text-amber-900">
                      {title}
                    </h2>
                    <p className="text-md font-bold text-gray-600 align">
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
                    <span className="font-normal">{download_count}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}/`);
  const content = await res.json();

  return {
    props: {
      content,
    },
  };
}

export default Home;
