import { Fragment, useState, useEffect, useRef } from 'react';

import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';

import { selectError, setError } from '../../renderless/error-handler/errorHandlerSlice';

export default function Notification() {
  const [show, setShow] = useState(false);
  const error = useSelector(selectError);
  const timer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setShow(!!error);
    if (error) {
      timer.current = setTimeout(() => {
        setShow(false);
        dispatch(setError(''));
      }, 5000);

      return () => clearTimeout(timer.current);
    }
  }, [error, dispatch]);

  return (
    <>
      <div aria-live="assertive" className="z-50 fixed inset-0 flex px-4 py-6 pointer-events-none p-6 items-start">
        <div className="w-full flex flex-col space-y-4 items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-500 transition"
            enterFrom="opacity-0 translate-y-0 translate-x-2"
            enterTo="translate-y-0 opacity-100 translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="max-w-sm w-full bg-gray-50 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircleIcon className="h-6 w-6 text-dangerous-700" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-base font-medium text-gray-900">{error}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500setShow(false) focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                      onClick={() => {
                        setShow(false);
                        dispatch(setError(''));
                      }}>
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
