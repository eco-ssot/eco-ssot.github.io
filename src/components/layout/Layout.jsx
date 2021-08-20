import Header from '../header/Header';
import Spinner from '../spinner/Spinner';
import Notification from '../notification/Notification';

export default function Layout({ children }) {
  return (
    <>
      <Notification />
      <Spinner />
      <div className="dark:bg-gray-900 dark:text-gray-50">
        <Header className="flex fixed w-full h-16" authenticated={true} />
        <div className="pt-16">{children}</div>
      </div>
    </>
  );
}
