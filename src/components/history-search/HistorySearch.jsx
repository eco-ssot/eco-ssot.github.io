import { useState } from 'react';

import { ArrowRightIcon } from '@heroicons/react/outline';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import { selectYoptions } from '../../app/appSlice';
import Button from '../button/Button';
import Select from '../select/Select';

export function isSameYear({ yearOptions, startYear, endYear } = {}) {
  const sy = startYear || yearOptions.slice(-1)[0].key;
  const ey = endYear || yearOptions[0].key;
  return sy === ey;
}

export function getStartYearOptions({ yearOptions, searchOption }) {
  return yearOptions.map((option) => ({
    ...option,
    disabled: Number(option.key) > Number(searchOption.endYear),
  }));
}

export function getEndYearOptions({ yearOptions, searchOption }) {
  return yearOptions.map((option) => ({
    ...option,
    disabled: Number(option.key) < Number(searchOption.startYear),
  }));
}

export function getStartMonthOptions(searchOption) {
  return APP_CONSTANTS.MONTH_OPTIONS.map((option) => ({
    ...option,
    disabled: Number(option.key) > Number(searchOption.endMonth),
  }));
}

export function getEndMonthOptions(searchOption) {
  return APP_CONSTANTS.MONTH_OPTIONS.map((option) => ({
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
    dimension: searchOption.dimension || APP_CONSTANTS.DIMENSION_OPTIONS[0].key,
    ...(sameYear && {
      startMonth: searchOption.startMonth || startMonthOptions[0].key,
      monthType: null,
    }),
    ...(!sameYear && {
      startMonth: null,
      monthType: searchOption.monthType || APP_CONSTANTS.MONTH_RANGE_OPTIONS[0].key,
    }),
  };
}

export default function HistorySearch({ downloadResource, option = {}, onSearch = () => {} }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const yearOptions = useSelector(selectYoptions);
  const sameYear = isSameYear({ yearOptions, ...searchOption });
  const startYearOptions = getStartYearOptions({ yearOptions, searchOption });
  const endYearOptions = getEndYearOptions({ yearOptions, searchOption });
  const startMonthOptions = getStartMonthOptions(searchOption);
  const endMonthOptions = getEndMonthOptions(searchOption);
  return (
    <div className="grid w-full grid-cols-12 items-center py-4">
      <div></div>
      <div className="col-span-10 flex justify-center">
        <Select
          label={t('selectLabel.searchYear')}
          options={startYearOptions}
          selected={
            startYearOptions.find((option) => option.key === searchOption.startYear) || startYearOptions.slice(-1)[0]
          }
          onChange={(e) => setSearchOption((prev) => ({ ...prev, startYear: e.key }))}
          buttonClassName="min-w-28"
        />
        <Select
          className="mr-8"
          label={<ArrowRightIcon className="ml-2 mr-1 h-5 w-5" />}
          options={endYearOptions}
          selected={endYearOptions.find((option) => option.key === searchOption.endYear)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, endYear: e.key }))}
          buttonClassName="min-w-28"
          splitter=""
        />
        {!sameYear && (
          <Select
            label={t('selectLabel.searchMonth')}
            options={APP_CONSTANTS.MONTH_RANGE_OPTIONS}
            buttonClassName="w-48"
            className="mr-2"
            selected={APP_CONSTANTS.MONTH_RANGE_OPTIONS.find((option) => option.key === searchOption.monthType)}
            onChange={(e) => setSearchOption((prev) => ({ ...prev, monthType: e.key }))}
          />
        )}
        {sameYear && (
          <Select
            label={t('selectLabel.searchMonth')}
            options={startMonthOptions}
            buttonClassName="w-24"
            optionClassName="max-h-screen"
            selected={startMonthOptions.find((option) => option.key === searchOption.startMonth)}
            onChange={(e) => setSearchOption((prev) => ({ ...prev, startMonth: e.key }))}
          />
        )}
        <Select
          options={APP_CONSTANTS.MONTH_OPTIONS}
          buttonClassName="w-24"
          optionClassName="max-h-screen"
          className="mr-8"
          selected={
            APP_CONSTANTS.MONTH_OPTIONS.find((option) => option.key === searchOption.endMonth) ||
            APP_CONSTANTS.MONTH_OPTIONS.slice(-1)[0]
          }
          onChange={(e) => setSearchOption((prev) => ({ ...prev, endMonth: e.key }))}
          {...(sameYear && {
            label: <ArrowRightIcon className="mx-2 h-5 w-5" />,
            options: endMonthOptions,
            selected:
              endMonthOptions.find((option) => option.key === searchOption.endMonth) || endMonthOptions.slice(-1)[0],
            splitter: '',
          })}
        />
        <Select
          label={t('selectLabel.dimension')}
          options={APP_CONSTANTS.DIMENSION_OPTIONS}
          buttonClassName="w-36"
          optionClassName="max-h-screen"
          className="mr-8"
          selected={APP_CONSTANTS.DIMENSION_OPTIONS.find((option) => option.key === searchOption.dimension)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, dimension: e.key }))}
        />
        <Button
          onClick={() =>
            onSearch(
              getQuery({ searchOption, sameYear, startYearOptions, endYearOptions, startMonthOptions, endMonthOptions })
            )
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
          href={`${import.meta.env.VITE_API_BASE_URL}/${downloadResource}/download?${qs.stringify(
            getQuery({ searchOption, sameYear, startYearOptions, endYearOptions, startMonthOptions, endMonthOptions }),
            { skipNull: true }
          )}`}
        >
          Excel
        </a>
      </div>
    </div>
  );
}
