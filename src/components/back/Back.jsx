import { ChevronLeftIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-use';

export default function Back() {
  const { t } = useTranslation(['component', 'analysisPage']);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  return (
    <div
      className={clsx(
        'ml-4 mt-4 flex cursor-pointer items-center space-x-2 text-gray-300 hover:text-green-50',
        location.state.usr === null ? 'block' : 'hidden'
      )}
      onClick={() => navigate(-1)}
    >
      <ChevronLeftIcon className="h-5 w-5 " />
      <div>{t('analysisPage:backDesc')}</div>
    </div>
  );
}
