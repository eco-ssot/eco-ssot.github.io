import { useState } from 'react';

import { ArrowRightIcon } from '@heroicons/react/outline';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';

import APP_CONFIG from '../../constants/app-config';
import Button from '../button/Button';
import Select from '../select/Select';

export function isSameYear({ startYear, endYear } = {}) {
  const sy = startYear || APP_CONFIG.YEAR_OPTIONS.slice(-1)[0].key;
  const ey = endYear || APP_CONFIG.YEAR_OPTIONS[0].key;
  return sy === ey;
}

export function getStartYearOptions(searchOption) {
  return APP_CONFIG.YEAR_OPTIONS.map((option) => ({
    ...option,
    disabled: Number(option.key) > Number(searchOption.endYear),
  }));
}

export function getEndYearOptions(searchOption) {
  return APP_CONFIG.YEAR_OPTIONS.map((option) => ({
    ...option,
    disabled: Number(option.key) < Number(searchOption.startYear),
  }));
}

export function getStartMonthOptions(searchOption) {
  return APP_CONFIG.MONTH_OPTIONS.map((option) => ({
    ...option,
    disabled: Number(option.key) > Number(searchOption.endMonth),
  }));
}

export function getEndMonthOptions(searchOption) {
  return APP_CONFIG.MONTH_OPTIONS.map((option) => ({
    ...option,
    disabled: Number(option.key) < Number(searchOption.startMonth),
  }));
}

export function getQuery({
  searchOption = {},
  startYearOptions = [],
  endYearOptions = [],
  endMonthOptions = [],
  startMonthOptions = [],
  sameYear = false,
} = {}) {
  return {
    ...searchOption,
    startYear: searchOption.startYear || startYearOptions.slice(-1)[0].key,
    endYear: searchOption.endYear || endYearOptions[0].key,
    endMonth: searchOption.endMonth || endMonthOptions.slice(-1)[0].key,
    dimension: searchOption.dimension || APP_CONFIG.DIMENSION_OPTIONS[0].key,
    ...(sameYear && {
      startMonth: searchOption.startMonth || startMonthOptions[0].key,
      monthType: null,
    }),
    ...(!sameYear && {
      startMonth: null,
      monthType: searchOption.monthType || APP_CONFIG.MONTH_RANGE_OPTIONS[0].key,
    }),
  };
}

export default function HistorySearch({ downloadResource, option = {}, onSearch = () => {} }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const sameYear = isSameYear(searchOption);
  const startYearOptions = getStartYearOptions(searchOption);
  const endYearOptions = getEndYearOptions(searchOption);
  const startMonthOptions = getStartMonthOptions(searchOption);
  const endMonthOptions = getEndMonthOptions(searchOption);
  return (
    <div className="w-full grid grid-cols-12 py-4 items-center">
      <div></div>
      <div className="flex justify-center col-span-10">
        <Select
          label={`${t('selectLabel.searchYear')} : `}
          options={startYearOptions}
          selected={
            startYearOptions.find((option) => option.key === searchOption.startYear) || startYearOptions.slice(-1)[0]
          }
          onChange={(e) => setSearchOption((prev) => ({ ...prev, startYear: e.key }))}
          buttonClassName="min-w-28"
        />
        <Select
          className="mr-8"
          label={<ArrowRightIcon className="h-5 w-5 mx-2" />}
          options={endYearOptions}
          selected={endYearOptions.find((option) => option.key === searchOption.endYear)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, endYear: e.key }))}
          buttonClassName="min-w-28"
        />
        {!sameYear && (
          <Select
            label={`${t('selectLabel.searchMonth')} : `}
            options={APP_CONFIG.MONTH_RANGE_OPTIONS}
            buttonClassName="w-48"
            className="mr-2"
            selected={APP_CONFIG.MONTH_RANGE_OPTIONS.find((option) => option.key === searchOption.monthType)}
            onChange={(e) => setSearchOption((prev) => ({ ...prev, monthType: e.key }))}
          />
        )}
        {sameYear && (
          <Select
            label={`${t('selectLabel.searchMonth')} : `}
            options={startMonthOptions}
            buttonClassName="w-24"
            optionClassName="max-h-screen"
            selected={startMonthOptions.find((option) => option.key === searchOption.startMonth)}
            onChange={(e) => setSearchOption((prev) => ({ ...prev, startMonth: e.key }))}
          />
        )}
        <Select
          options={APP_CONFIG.MONTH_OPTIONS}
          buttonClassName="w-24"
          optionClassName="max-h-screen"
          className="mr-8"
          selected={
            APP_CONFIG.MONTH_OPTIONS.find((option) => option.key === searchOption.endMonth) ||
            APP_CONFIG.MONTH_OPTIONS.slice(-1)[0]
          }
          onChange={(e) => setSearchOption((prev) => ({ ...prev, endMonth: e.key }))}
          {...(sameYear && {
            label: <ArrowRightIcon className="h-5 w-5 mx-2" />,
            options: endMonthOptions,
            selected:
              endMonthOptions.find((option) => option.key === searchOption.endMonth) || endMonthOptions.slice(-1)[0],
          })}
        />
        <Select
          label={`${t('selectLabel.dimension')} : `}
          options={APP_CONFIG.DIMENSION_OPTIONS}
          buttonClassName="w-36"
          optionClassName="max-h-screen"
          className="mr-8"
          selected={APP_CONFIG.DIMENSION_OPTIONS.find((option) => option.key === searchOption.dimension)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, dimension: e.key }))}
        />
        <Button
          onClick={() =>
            onSearch(
              getQuery({ searchOption, sameYear, startYearOptions, endYearOptions, startMonthOptions, endMonthOptions })
            )
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
          href={`${process.env.REACT_APP_API_BASE_URL}/${downloadResource}/download?${qs.stringify(
            getQuery({ searchOption, sameYear, startYearOptions, endYearOptions, startMonthOptions, endMonthOptions })
          )}`}>
          Excel
        </a>
      </div>
    </div>
  );
}
