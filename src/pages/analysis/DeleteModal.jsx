import { InformationCircleIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';

import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';

export default function DeleteModal({ open = false, setOpen = () => {}, onConfirm = () => {} }) {
  const { t } = useTranslation(['component']);
  return (
    <Modal
      open={!!open}
      setOpen={setOpen}
      title={<div className="h-8"></div>}
      footer={
        <div className="flex my-4 justify-center space-x-8">
          <Button variant="plain" onClick={() => setOpen(false)}>
            {t('component:button.cancel')}
          </Button>
          <Button
            onClick={() => {
              onConfirm(open);
              setOpen(false);
            }}>
            {t('component:button.delete')}
          </Button>
        </div>
      }>
      <div className="flex w-full items-center justify-center pt-8 pb-4 space-x-4">
        <InformationCircleIcon className="w-5 h-5 text-_yellow" />
        <div>{t('component:modal.sureToDelete')}</div>
      </div>
    </Modal>
  );
}
