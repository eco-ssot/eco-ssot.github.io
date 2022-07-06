import { useState } from 'react';

import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import { selectYoptions } from '../../app/appSlice';
import Button from '../../components/button/Button';
import Select from '../../components/select/Select';

export default function OverviewSearch({ downloadResource, option = {}, onSearch = () => {} }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const yearOptions = useSelector(selectYoptions);
  return (
    <div className="grid w-full grid-cols-12 items-center py-4">
      <div></div>
      <div className="col-span-10 flex justify-center space-x-8">
        <Select
          label={t('selectLabel.searchYear')}
          options={yearOptions}
          selected={yearOptions.find((option) => option.key === searchOption.year)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
          buttonClassName="min-w-28"
        />
        <Select
          buttonClassName="w-36"
          label={t('selectLabel.dimension')}
          options={APP_CONSTANTS.DIMENSION_OPTIONS}
          selected={APP_CONSTANTS.DIMENSION_OPTIONS.find((option) => option.key === searchOption.dimension)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, dimension: e.key }))}
        />
        <Button
          onClick={() =>
            onSearch({
              ...searchOption,
              year: searchOption.year || yearOptions[0].key,
              dimension: searchOption.dimension || APP_CONSTANTS.DIMENSION_OPTIONS[0].key,
            })
          }
        >
          {t('button.search')}
        </Button>
      </div>
      <div className="text-right">
        <a
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded border border-transparent bg-primary-600 px-4 py-1 text-base font-medium text-gray-50 shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-primary-900"
          href={`${process.env.REACT_APP_API_BASE_URL}/${downloadResource}/download?${qs.stringify({
            ...searchOption,
            year: searchOption.year || yearOptions[0].key,
            dimension: searchOption.dimension || APP_CONSTANTS.DIMENSION_OPTIONS[0].key,
          })}`}
        >
          Excel
        </a>
      </div>
    </div>
  );
}
