import { Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

export default function UnauthorizedPage({ error, resetErrorBoundary }) {
  const { instance, user } = useAuth();
  if (!!user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="inset-0 flex h-full min-h-screen flex-grow flex-col items-center justify-center">
      <div className="max-w-screen-sm mx-auto -translate-y-24 text-center">
        <h1 className="mb-4 text-9xl font-extrabold tracking-tight text-primary-600">401</h1>
        <p className="mb-4 text-3xl font-bold tracking-tight text-gray-50">Unauthorized</p>
        <p className="mb-4 text-lg font-light text-gray-400">Sorry, You do not have permission to view this page.</p>
        <button
          className="my-4 inline-flex rounded bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-gray-50 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-900"
          onClick={() => instance.logoutRedirect()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
