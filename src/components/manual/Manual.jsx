import { useState } from 'react';

import { Popover } from '@headlessui/react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { ReactComponent as PdfIcon } from '../../icons/file-pdf-solid.svg';
import TourPanel from '../../pages/home/TourPanel';
import Legend from '../legend/Legend';
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
          <div className="flex cursor-pointer" onClick={() => setOpen(true)}>
            <Legend dotClassName="bg-dangerous-700" />
            <div className="cursor-pointer whitespace-nowrap">新功能導覽</div>
          </div>
          <a
            target="_blank"
            className="flex cursor-pointer text-blue-400 underline visited:text-purple-400"
            href={PATH.zh}
            rel="noreferrer"
          >
            <div className="whitespace-nowrap">中文</div>
            <ArrowTopRightOnSquareIcon className="h-5 w-5 scale-90" />
          </a>
          <a
            target="_blank"
            className="flex cursor-pointer text-blue-400 underline visited:text-purple-400"
            href={PATH.en}
            rel="noreferrer"
          >
            <div className="whitespace-nowrap">English</div>
            <ArrowTopRightOnSquareIcon className="h-5 w-5 scale-90" />
          </a>
        </Popover.Panel>
      </Popover>
      <TourPanel open={Boolean(open)} setOpen={setOpen} />
    </>
  );
}
