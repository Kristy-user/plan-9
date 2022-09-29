import React, { useState } from 'react';
import NextImage from 'next/image';
import imgTemplate from '../public/template.png';
type BookImageProps = {
  src?: string;
  width: string;
  height: string;
  id: number;
};

const BookImage = ({ src, id, ...props }: BookImageProps) => {
  const [isReady, setIsReady] = useState(false);
  const onLoadCallback = () => {
    setIsReady(true);
  };

  return (
    <NextImage
      objectFit="contain"
      src={src ? src : imgTemplate}
      className={`bg-inherit transition duration-1000 ${
        isReady ? 'blur-0 scale-100' : 'blur-2xl scale-120'
      }`}
      {...props}
      onLoadingComplete={onLoadCallback}
      layout="responsive"
      priority={id}
    />
  );
};

export default BookImage;
