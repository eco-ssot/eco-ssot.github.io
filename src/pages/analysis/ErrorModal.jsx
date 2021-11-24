import { InformationCircleIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';

import Modal from '../../components/modal/Modal';

export default function ErrorModal({ open = false, setOpen = () => {} }) {
  const { t } = useTranslation(['component']);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={
        <div className="flex items-center space-x-2">
          <InformationCircleIcon className="w-5 h-5 text-_yellow" />
          <div>{t('component:modal.incompleteContent')}</div>
        </div>
      }>
      <div className="px-8 py-2 flex flex-col space-y-2 items-center justify-center">
        <div className="pt-8 pb-4">{t('component:modal.allColumnRequiredExceptCloseDate')}</div>
      </div>
    </Modal>
  );
}
