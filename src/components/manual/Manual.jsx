import { useState } from 'react';

import { Popover } from '@headlessui/react';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { isBoolean } from 'lodash';

import { ReactComponent as PdfIcon } from '../../icons/file-pdf-solid.svg';
// import DeleteVersionModal from '../modal/DeleteVersionModal';
import TourPanel from '../../pages/home/TourPanel';
import Tooltip from '../tooltip/Tooltip';

const PATH = {
  zh: '/ECO SSOT 系統說明手冊_v3.0.0.pdf',
  en: '/ECO SSOT Instruction_v3.0.0.pdf',
};

const TITLE = {
  zh: '系統說明手冊',
  en: 'User Manual',
};

export default function Manual({ lng }) {
  const title = TITLE[lng] || TITLE.en;
  const path = PATH[lng] || PATH.en;
  const [open, setOpen] = useState(false);
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
          <div className="cursor-pointer whitespace-nowrap" onClick={() => setOpen()}>
            新功能導覽
          </div>

          <a
            target="_blank"
            className="flex cursor-pointer text-blue-400 underline visited:text-purple-400"
            href={PATH.zh}
            rel="noreferrer"
          >
            <div className="whitespace-nowrap">中文</div>
            <ExternalLinkIcon className="h-5 w-5 scale-90" />
          </a>
          <a
            target="_blank"
            className="flex cursor-pointer text-blue-400 underline visited:text-purple-400"
            href={PATH.en}
            rel="noreferrer"
          >
            <div className="whitespace-nowrap">English</div>
            <ExternalLinkIcon className="h-5 w-5 scale-90" />
          </a>
        </Popover.Panel>
      </Popover>
      <TourPanel open={!isBoolean(open)} setOpen={setOpen} />
    </>
  );
}
