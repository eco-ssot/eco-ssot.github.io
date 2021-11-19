import { useState } from 'react';

import qs from 'query-string';
import { useTranslation } from 'react-i18next';

import Button from '../../components/button/Button';
import Select from '../../components/select/Select';
import APP_CONFIG from '../../constants/app-config';

export default function OverviewSearch({ downloadResource, option = {}, onSearch = () => {} }) {
  const { t } = useTranslation();
  const [searchOption, setSearchOption] = useState(option);
  return (
    <div className="w-full grid grid-cols-12 py-4 items-center">
      <div></div>
      <div className="flex justify-center space-x-8 col-span-10">
        <Select
          label={`${t('selectLabel.searchYear')}：`}
          options={APP_CONFIG.YEAR_OPTIONS}
          selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === searchOption.year)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
        />
        <Select
          buttonClassName="w-36"
          label={`${t('selectLabel.dimension')}：`}
          options={APP_CONFIG.DIMENSION_OPTIONS}
          selected={APP_CONFIG.DIMENSION_OPTIONS.find((option) => option.key === searchOption.dimension)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, dimension: e.key }))}
        />
        <Button
          onClick={() =>
            onSearch({
              ...searchOption,
              year: searchOption.year || APP_CONFIG.YEAR_OPTIONS[0].key,
              dimension: searchOption.dimension || APP_CONFIG.DIMENSION_OPTIONS[0].key,
            })
          }>
          {t('button.search')}
        </Button>
      </div>
      <div className="text-right">
        <a
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600"
          href={`${process.env.REACT_APP_API_BASE_URL}/${downloadResource}/download?${qs.stringify({
            ...searchOption,
            year: searchOption.year || APP_CONFIG.YEAR_OPTIONS[0].key,
            dimension: searchOption.dimension || APP_CONFIG.DIMENSION_OPTIONS[0].key,
          })}`}>
          Excel
        </a>
      </div>
    </div>
  );
}
