import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="max-w-screen-sm mx-auto -translate-y-24 text-center">
        <h1 className="mb-4 text-9xl font-extrabold tracking-tight text-primary-600">404</h1>
        <p className="mb-4 text-3xl font-bold tracking-tight text-gray-50">Page Not Found</p>
        <p className="mb-4 text-lg font-light text-gray-400">Sorry, we couldn't find the page you're looking for.</p>
        <Link
          to="/"
          className="my-4 inline-flex rounded bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-gray-50 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-900 "
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
