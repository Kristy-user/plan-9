import React, { useState } from 'react';

type CheckBoxLangProps = {
  setLang: (value: string) => void;
  currentLang: string;
};

const CheckBoxLang = ({ setLang, currentLang }: CheckBoxLangProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="text-center pt-6 flex place-content-center">
      <h3 className="font-bold text-l text-amber-900 mr-5">Choose language:</h3>
      <form className="">
        <div className="inline mr-3">
          <input
            className="inline"
            type="radio"
            id="en"
            name="lang"
            value={'en'}
            onChange={handleChange}
            checked={currentLang === 'en'}
          />
          <label className="inline text-left  pl-2" htmlFor="en">
            English
          </label>
        </div>
        <div className="inline">
          <input
            className="inline "
            type="radio"
            id="fr"
            name="lang"
            value={'fr'}
            onChange={handleChange}
            checked={currentLang === 'fr'}
          />
          <label className="inline text-left pl-2" htmlFor="zh">
            French
          </label>
        </div>
      </form>
    </div>
  );
};

export default CheckBoxLang;
