import { useTranslation } from 'react-i18next';

import { useGetVersionQuery } from '../../services/public';

export default function VersionPage() {
  const { t } = useTranslation(['managementPage']);
  const { data: version } = useGetVersionQuery();
  return (
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-2">
        <div className="text-xl font-medium space-y-2">{t('managementPage:changelog.title')}</div>
        {version &&
          Object.entries(version)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([key]) => (
              <div key={key}>
                {key} : {t(`managementPage:changelog.${key}`)}
              </div>
            ))}
      </div>
    </div>
  );
}
