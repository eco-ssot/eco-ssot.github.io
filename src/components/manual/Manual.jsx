import { Popover } from '@headlessui/react';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Tippy from '@tippyjs/react';

import { ReactComponent as PdfIcon } from '../../icons/file-pdf-solid.svg';

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
      <Tippy content={title}>
        <a href={path} target="_blank" rel="noreferrer">
          <PdfIcon className="w-5 h-5 fill-gray-50" />
        </a>
      </Tippy>
      <Popover className="relative ml-2">
        <Popover.Button className="align-bottom">
          <ChevronDownIcon className="w-5 h-5 fill-gray-50" />
        </Popover.Button>
        <Popover.Panel className="flex flex-col mt-2 absolute z-10 bg-primary-900 p-2 border border-divider rounded shadow space-y-2">
          <a
            target="_blank"
            className="flex cursor-pointer items-center underline text-blue-400 visited:text-purple-400"
            href={PATH.zh}
            rel="noreferrer">
            <ExternalLinkIcon className="w-5 h-5" />
            <div className="whitespace-nowrap">中文</div>
          </a>
          <a
            target="_blank"
            className="flex cursor-pointer items-center underline text-blue-400 visited:text-purple-400"
            href={PATH.en}
            rel="noreferrer">
            <ExternalLinkIcon className="w-5 h-5" />
            <div className="whitespace-nowrap">English</div>
          </a>
        </Popover.Panel>
      </Popover>
    </>
  );
}
