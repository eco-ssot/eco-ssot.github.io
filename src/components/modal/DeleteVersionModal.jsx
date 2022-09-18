import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { useDeleteVersionMutation } from '../../services/management';
import Button from '../button/Button';

import Modal from './Modal';

export default function DeleteVersionModal({ open = false, setOpen = () => {}, onConfirm = () => {}, id }) {
  const { t } = useTranslation(['component']);
  const [deleteVersion] = useDeleteVersionMutation();

  return (
    <Modal
      open={!!open}
      setOpen={setOpen}
      title={<div className="h-8"></div>}
      footer={
        <div className="my-4 flex justify-center space-x-8">
          <Button variant="plain" onClick={() => setOpen(false)}>
            {t('component:button.cancel')}
          </Button>
          <Button
            onClick={() => {
              onConfirm(open);
              setOpen(false);
              deleteVersion({ id });
            }}
          >
            {t('component:button.delete')}
          </Button>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center space-x-4 pt-8 pb-4">
        <InformationCircleIcon className="h-5 w-5 text-_yellow" />
        <div>{t('component:modal.sureToDelete')}</div>
      </div>
    </Modal>
  );
}
