import { InformationCircleIcon } from '@heroicons/react/solid';

import Modal from '../../components/modal/Modal';

export default function ErrorModal({ open = false, setOpen = () => {} }) {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={
        <div className="flex items-center space-x-2">
          <InformationCircleIcon className="w-5 h-5 text-_yellow" />
          <div>內容填寫不完整</div>
        </div>
      }>
      <div className="px-8 py-2 flex flex-col space-y-2 items-center justify-center">
        <div className="pt-8 pb-4">請確認「完成日期以外之欄位」皆不可為空白。</div>
      </div>
    </Modal>
  );
}
