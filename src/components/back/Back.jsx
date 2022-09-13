import { ChevronLeftIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export default function Back() {
  const { t } = useTranslation(['component', 'analysisPage']);
  const goBackPage = () => {
    window.history.back();
  };

  return (
    <div
      className={clsx(
        'ml-4 mt-4 flex cursor-pointer items-center space-x-2 text-gray-300 hover:text-green-50',
        window.history.state.usr === null ? 'block' : 'hidden'
      )}
      onClick={() => goBackPage()}
    >
      <ChevronLeftIcon className="h-5 w-5 " />
      <div>{t('analysisPage:backDesc')}</div>
    </div>
  );
}
