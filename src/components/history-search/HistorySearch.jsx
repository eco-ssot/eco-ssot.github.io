import { useState } from 'react';

import { ArrowRightIcon } from '@heroicons/react/outline';

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

export default function HistorySearch({ option = {}, onSearch = () => {} }) {
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
          label="查詢年度："
          options={startYearOptions}
          selected={
            startYearOptions.find((option) => option.key === searchOption.startYear) || startYearOptions.slice(-1)[0]
          }
          onChange={(e) => setSearchOption((prev) => ({ ...prev, startYear: e.key }))}
        />
        <Select
          className="mr-8"
          label={<ArrowRightIcon className="h-5 w-5 mx-2" />}
          options={endYearOptions}
          selected={endYearOptions.find((option) => option.key === searchOption.endYear)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, endYear: e.key }))}
        />
        {!sameYear && (
          <Select
            label="查詢月份："
            options={APP_CONFIG.MONTH_RANGE_OPTIONS}
            buttonClassName="w-48"
            className="mr-2"
            selected={APP_CONFIG.MONTH_RANGE_OPTIONS.find((option) => option.key === searchOption.monthType)}
            onChange={(e) => setSearchOption((prev) => ({ ...prev, monthType: e.key }))}
          />
        )}
        {sameYear && (
          <Select
            label="查詢月份："
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
          label="資料呈現："
          options={APP_CONFIG.DIMENSION_OPTIONS}
          buttonClassName="w-36"
          optionClassName="max-h-screen"
          className="mr-8"
          selected={APP_CONFIG.DIMENSION_OPTIONS.find((option) => option.key === searchOption.dimension)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, dimension: e.key }))}
        />
        <Button
          onClick={() =>
            onSearch({
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
            })
          }>
          搜尋
        </Button>
      </div>
      <div className="text-right">
        <Button>Excel</Button>
      </div>
    </div>
  );
}
