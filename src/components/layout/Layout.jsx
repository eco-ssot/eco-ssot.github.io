import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import Header from '../header/Header';
import Spinner from '../spinner/Spinner';

export default function Layout() {
  return (
    <>
      <Toaster />
      <Spinner />
      <Header className="fixed flex h-16 w-full" />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}
