import Header from '../header/Header';
import Spinner from '../spinner/Spinner';

export default function Layout({ children }) {
  return (
    <>
      <Spinner />
      <div className="dark:bg-gray-900 dark:text-gray-50">
        <Header className="flex fixed w-full h-16" />
        <div className="pt-16">{children}</div>
      </div>
    </>
  );
}
