import { InformationCircleIcon } from '@heroicons/react/24/solid';
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
          <InformationCircleIcon className="h-5 w-5 text-_yellow" />
          <div>{t('component:modal.inputValueError')}</div>
        </div>
      }
    >
      <div className="flex flex-col items-start space-y-2 px-8 py-2">
        <div className="py-4">{t('component:modal.checkInputRules')}</div>
        <div>{t('component:modal.goalRule1')}</div>
        <div>{t('component:modal.goalRule2')}</div>
      </div>
    </Modal>
  );
}
