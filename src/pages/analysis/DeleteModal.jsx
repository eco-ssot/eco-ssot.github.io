import { InformationCircleIcon } from '@heroicons/react/solid';

import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';

export default function DeleteModal({ open = false, setOpen = () => {}, onConfirm = () => {} }) {
  return (
    <Modal
      open={!!open}
      setOpen={setOpen}
      title={<div className="h-8"></div>}
      footer={
        <div className="flex my-4 justify-center space-x-8">
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button
            onClick={() => {
              onConfirm(open);
              setOpen(false);
            }}>
            刪除
          </Button>
        </div>
      }>
      <div className="flex w-full items-center justify-center pt-8 pb-4 space-x-4">
        <InformationCircleIcon className="w-5 h-5 text-_yellow" />
        <div>您確定要刪除此項目嗎？</div>
      </div>
    </Modal>
  );
}
