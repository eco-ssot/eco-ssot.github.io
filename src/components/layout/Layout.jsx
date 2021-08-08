import Header from '../header/Header';

export default function Layout({ children }) {
  return (
    <div className="dark:bg-black dark:text-white">
      <Header />
      {children}
    </div>
  );
}
