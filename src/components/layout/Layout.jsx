import Header from '../header/Header';

export default function Layout({ children }) {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-50">
      <Header className="flex fixed w-full h-header" />
      <div className="pt-header">{children}</div>
    </div>
  );
}
