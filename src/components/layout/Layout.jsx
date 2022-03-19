import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import Header from '../header/Header';
import Spinner from '../spinner/Spinner';

export default function Layout() {
  return (
    <>
      <Toaster />
      <Spinner />
      <Header className="flex fixed w-full h-16" />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}
