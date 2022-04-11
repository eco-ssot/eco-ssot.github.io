import { InformationCircleIcon } from '@heroicons/react/solid';

import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';

export default function ConfirmModal({ open = false, setOpen = () => {}, onConfirm = () => {}, onCancel = () => {} }) {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={<div className="h-6"></div>}
      footer={
        <div className="flex items-center justify-center space-x-8 p-4">
          <Button
            variant="plain"
            onClick={() => {
              setOpen(false);
              onCancel();
            }}>
            取消
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}>
            新增
          </Button>
        </div>
      }>
      <div className="flex items-center justify-center space-x-2 pt-8">
        <InformationCircleIcon className="h-5 w-5 text-_yellow" />
        <div>項目新增後即不可再編輯，您確定要新增嗎？</div>
      </div>
    </Modal>
  );
}
