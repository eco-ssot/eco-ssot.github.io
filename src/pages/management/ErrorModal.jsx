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
          <div>輸入值錯誤</div>
        </div>
      }>
      <div className="px-8 py-2 flex flex-col space-y-2 items-start">
        <div className="py-4">請確認輸入值是否符合下列條件：</div>
        <div>1. 基準年不可大於查詢年度。</div>
        <div>2. Target 訂定標準數值不可大於100%。</div>
      </div>
    </Modal>
  );
}
