import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';

export default function ConfirmModal({ open = false, setOpen = () => {}, onConfirm = () => {}, onCancel = () => {} }) {
  const { t } = useTranslation(['component', 'baselinePage']);
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
            }}
          >
            {t('component:button.cancel')}
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
          >
            {t('component:button.add')}
          </Button>
        </div>
      }
    >
      <div className="flex items-center justify-center space-x-2 pt-8">
        <InformationCircleIcon className="h-5 w-5 text-_yellow" />
        <div>{t('baselinePage:addWarning')}</div>
      </div>
    </Modal>
  );
}
