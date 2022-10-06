import Head from 'next/head';
import Link from 'next/link';

interface MainContainerProps {
  keywords?: string;
  title?: string;
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  keywords,
  title,
}) => {
  return (
    <>
      <Head>
        <meta name="description" content="bookshelf" />
        <meta charSet="utf-8" />
        <meta keywords={'ulbi tv, nextjs' + keywords}></meta>
        <title>{title || 'Bookshelf'}</title>
      </Head>
      <div className="navbar">
        <Link href={'/'}>
          <a className="link"> Главная</a>
        </Link>
        <Link href={'/watched'}>
          <a className="link"> Просмотренные</a>
        </Link>
      </div>
      <div className="container">{children}</div>
      <style jsx>
        {`
          .navbar {
            text-align: center;
            background: #008cff54;
            padding: 15px;
            padding-right: 50%;
            color: rgb(120 53 15);
          }
          .link {
            text-decoration: none;
            color: #6d4912;
            font-size: 20px;
            margin-right: 10px;
            padding: 5px;
          }
          .link:hover {
            background-color: #fcfbfeb3;
            border-radius: 8px;
          }
          .container {
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
};

export default MainContainer;
