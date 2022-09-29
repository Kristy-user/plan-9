import BookImage from '../Components/BookImage';
import { useEffect, useState } from 'react';
import Spinner from '../Components/Spinner';
import { Book } from '../types/interface';
import SearchBox from '../Components/SearchBox';
import axios from 'axios';
const format_jpg: string = 'image/jpeg';

const Home = () => {
  const [currentContent, setCurrentContent] = useState<Book[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios
      .get(`http://gutendex.com/books/?page=${currentPage}`)
      .then((res) => {
        setCurrentContent([...currentContent, ...res.data.results]);
        setCurrentPage((prev) => prev + 1);
      })
      .finally(() => setFetching(false));
  }, [fetching]);
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

  return (
    <div className=" md:mx-auto bg-gray-100">
      <SearchBox setCurrentContent={setCurrentContent} />
      <div className="sm:p-16 lg:p-32 p-5 object-center max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4  gap-5 items-stretch place-content-center">
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
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
