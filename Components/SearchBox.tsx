import React, { useState } from 'react';
import { ErrorMessage } from './ErrorMesssage';
import axios from 'axios';

const SearchBox = ({ setCurrentContent }) => {
  const [keyword, setKeyword] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setError('');
    if (keyword.trim().length === 0) {
      setError('Please enter valid title.');
      return;
    }
    setCurrentContent(null);
    setLoading(true);
    axios
      .get(`https://gutendex.com/books?search=${keyword}`)
      .then((res) => {
        setCurrentContent(res.data.results);
        setLoading(false);
        setKeyword('');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-primary mb-1 text-center pt-10">
        <span className="text-active">Books</span> Search
      </h2>
      <form
        className="sm:mx-auto mt-10 justify-center sm:w-full sm:flex mb-4"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-semibold  border border-slate-300 focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Enter the book's title"
          value={keyword}
          onChange={changeHandler}
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
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
export default SearchBox;
