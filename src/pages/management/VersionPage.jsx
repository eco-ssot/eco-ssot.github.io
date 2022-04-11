import { useTranslation } from 'react-i18next';

import { useGetVersionQuery } from '../../services/public';

export default function VersionPage() {
  const { t } = useTranslation(['managementPage']);
  const { data: version } = useGetVersionQuery();
  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col space-y-2 rounded bg-primary-900 p-4 shadow">
        <div className="space-y-2 text-xl font-medium">{t('managementPage:changelog.title')}</div>
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
