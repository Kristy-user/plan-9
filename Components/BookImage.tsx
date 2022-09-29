import React, { useState } from 'react';
import NextImage from 'next/image';

type BookImageProps = {
  src: string;
  width: string;
  height: string;
};

const BookImage = ({ src, ...props }: BookImageProps) => {
  const [isReady, setIsReady] = useState(false);
  const onLoadCallback = () => {
    setIsReady(true);
  };

  return (
    <NextImage
      objectFit="contain"
      src={src}
      className={`bg-indigo-100 transition duration-1000 ${
        isReady ? 'blur-0 scale-100' : 'blur-2xl scale-120'
      }`}
      {...props}
      onLoadingComplete={onLoadCallback}
      layout="responsive"
    />
  );
};

export default BookImage;
