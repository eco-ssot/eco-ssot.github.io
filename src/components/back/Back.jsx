import { ChevronLeftIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Back(className) {
  const { t } = useTranslation(['component', 'analysisPage']);
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        'ml-4 mt-4 flex cursor-pointer items-center space-x-2 text-gray-300 hover:text-green-50 w-fit',
        className
      )}
      onClick={() => navigate(-1)}
    >
      <ChevronLeftIcon className="h-5 w-5 " />
      <div>{t('analysisPage:backDesc')}</div>
    </div>
  );
}
