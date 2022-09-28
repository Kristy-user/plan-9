// import axios from 'axios';
// import { useState } from 'react';

// export default function Home() {
//   const [keyword, setKeyword] = useState('The alchemist');
//   const [searchResults, setSearchResults] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const getResults = async () => {
//     try {
//       // Replace space with '+'
//       let title = keyword.replace(/ /g, '+');
//       setLoading(true);
//       const { data } = await axios.get('api/search/', {
//         params: { title },
//       });
//       // Add the data to the results state
//       setSearchResults(data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col md:px-12 px-4 bg-background font-poppins items-center min-h-screen">
//       <h1 className="md:text-6xl text-4xl font-bold text-primary mt-10">
//         <span className="text-active">Books</span> Search
//       </h1>
//       <h2 className="text-primary text-2xl font-light mt-6 font-ebas">
//         Search for any book using the Books API
//       </h2>
//       <form
//         className="sm:mx-auto mt-10 justify-center sm:w-full sm:flex"
//         onSubmit={(e) => {
//           getResults();
//           e.preventDefault();
//           e.stopPropagation();
//         }}
//       >
//         <input
//           type="text"
//           className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
//           placeholder="Enter the book's title"
//           defaultValue={keyword}
//           onChange={(e) => {
//             setKeyword(e.target.value);
//             setSearchResults(null);
//           }}
//         />

//         <div className="mt-4 sm:mt-0 sm:ml-3">
//           <button
//             className="block w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary sm:px-10"
//             type="submit"
//           >
//             {loading ? (
//               <span className="animate-pulse">Loading..</span>
//             ) : (
//               <>Search</>
//             )}
//           </button>
//         </div>
//       </form>

//       {searchResults && (
//         <div className="mt-10">
//           <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-3">
//             {searchResults.map((book) => {
//               return (
//                 <div key={book.book_id} className="pt-6">
//                   <div className="flow-root bg-light rounded-lg px-4 pb-8">
//                     <div className="-mt-6">
//                       <div className="flex items-center justify-center">
//                         <img
//                           src={
//                             // Removes compression to get higher quality
//                             book.cover.replace(/._SX50_|._SY75_/gi, '')
//                           }
//                           className="p-2 w-64 rounded-lg"
//                           alt={book.name}
//                         />
//                       </div>
//                       <div className="text-center justify-center items-center">
//                         <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">
//                           {book.name}
//                         </h3>
//                         <p className="mt-2 text-base leading-relaxed text-secondary">
//                           {book.authors[0]} ({book.year})
//                         </p>
//                         <span className="font-bold text-secondary">
//                           Rating: {book.rating}
//                         </span>
//                         <a
//                           href={book.url}
//                           className="mt-4 block text-active underline"
//                         >
//                           Read More
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       <div className="mt-20 mb-10 text-center">
//         <p className="text-primary text-xs">
//           Made by RapidAPI DevRel Team -{' '}
//           <a
//             className="hover:text-active"
//             href="https://github.com/RapidAPI/DevRel-Examples-External"
//           >
//             See more examples like this
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
import Book from '../Components/Book';

const format_jpg: string = 'image/jpeg';

const Home = ({ content }) => {
  let screenWidth: number;
  if (typeof window !== 'undefined') {
    screenWidth = window.screen.width;
  }

  return (
    <div className="bg-orange-100 sm:p-16 lg:p-32 p-5 object-center">
      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4  gap-5 items-stretch ">
        {content.results.map((character) => {
          const { id, title, formats, authors, download_count } = character;

          return (
            <div
              key={id}
              className="bg-yellow-200/25 hover:bg-yellow-200/50 border shadow-xl hover:shadow-inner cursor-pointer rounded-lg p-3 min-h-200 "
            >
              <div className="rounded-t-lg overflow-hidden ">
                <Book
                  src={formats[format_jpg]}
                  width={'100%'}
                  height={'100%'}
                />
              </div>
              <div className="mx-2 mt-4 w-full text-center">
                <h2 className="font-bold text-xl text-amber-900">{title}</h2>
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
        })}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch('https://gutendex.com/books/');
  const content = await res.json();

  return {
    props: {
      content,
    },
  };
}

export default Home;
