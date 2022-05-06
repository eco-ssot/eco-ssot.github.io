import { Fragment, useMemo } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import { isMatched } from '../../router/helpers';
import { privateRoutes } from '../../router/routes';

export function preloadElements({ element, routes }) {
  element?.preload?.();
  routes?.forEach(preloadElements);
}

export default function NavBar({ className }) {
  const { t } = useTranslation(['location']);
  const { pathname, search } = useLocation();
  const tabs = useMemo(() => privateRoutes.filter((route) => !route.hidden), []);
  return (
    <div className={clsx('flex flex-grow space-x-4', className)}>
      {tabs.map(({ index, indexPath, path, i18nKey, element, routes }, i) => (
        <div
          onMouseEnter={() => preloadElements({ element, routes })}
          aria-label={`nav-${i18nKey}`}
          key={i18nKey}
          className={clsx(
            'inline-flex items-center border-b-2 px-1 pt-1',
            isMatched(pathname)({ index, indexPath, path })
              ? 'border-primary-600 text-gray-50'
              : 'border-primary-800 text-gray-200 hover:text-gray-50',
            i > 4 && '2xl:hidden'
          )}>
          <Link
            to={{
              pathname: path,
              state: { from: pathname },
              search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS),
            }}
            className="text-lg font-medium text-current">
            <span className="block truncate">{t(i18nKey)}</span>
          </Link>
        </div>
      ))}
      <div className="relative hidden 2xl:block">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full items-center justify-center rounded-md py-2 px-3 text-lg font-medium text-gray-50 hover:bg-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            More
            <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-200 hover:text-gray-50" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute right-0 mt-1 w-48 origin-top-right rounded-md border border-divider bg-primary-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {tabs.slice(5).map(({ path, i18nKey }) => (
                <div className="px-1 py-1" key={i18nKey}>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={{
                          pathname: path,
                          state: { from: pathname },
                          search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS),
                        }}
                        className={clsx(
                          'group flex w-full items-center rounded-md px-2 py-2 text-lg font-medium text-current',
                          active ? 'bg-primary-600 text-gray-50' : 'text-gray-200 hover:text-gray-50'
                        )}>
                        <span className="block truncate">{t(i18nKey)}</span>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
