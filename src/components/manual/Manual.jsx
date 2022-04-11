import { Popover } from '@headlessui/react';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { ReactComponent as PdfIcon } from '../../icons/file-pdf-solid.svg';
import Tooltip from '../tooltip/Tooltip';

const PATH = {
  zh: '/ESG績效管理平台使用手冊.pdf',
  en: '/ESG_USER_MANUAL.pdf',
};

const TITLE = {
  zh: '系統說明手冊',
  en: 'User Manual',
};

export default function Manual({ lng }) {
  const title = TITLE[lng] || TITLE.en;
  const path = PATH[lng] || PATH.en;
  return (
    <>
      <Tooltip label={title}>
        <a href={path} target="_blank" rel="noreferrer">
          <PdfIcon className="h-5 w-5 fill-gray-50" />
        </a>
      </Tooltip>
      <Popover className="relative ml-2">
        <Popover.Button className="align-bottom">
          <ChevronDownIcon className="h-5 w-5 fill-gray-50" />
        </Popover.Button>
        <Popover.Panel className="absolute z-10 mt-2 flex flex-col space-y-2 rounded border border-divider bg-primary-900 p-2 shadow">
          <a
            target="_blank"
            className="flex cursor-pointer items-center text-blue-400 underline visited:text-purple-400"
            href={PATH.zh}
            rel="noreferrer">
            <ExternalLinkIcon className="h-5 w-5" />
            <div className="whitespace-nowrap">中文</div>
          </a>
          <a
            target="_blank"
            className="flex cursor-pointer items-center text-blue-400 underline visited:text-purple-400"
            href={PATH.en}
            rel="noreferrer">
            <ExternalLinkIcon className="h-5 w-5" />
            <div className="whitespace-nowrap">English</div>
          </a>
        </Popover.Panel>
      </Popover>
    </>
  );
}
