import { useState } from 'react';

import Button from '../../components/button/Button';
import Select from '../../components/select/Select';
import APP_CONFIG from '../../constants/app-config';

export default function OverviewSearch({ option = {}, onSearch = () => {} }) {
  const [searchOption, setSearchOption] = useState(option);
  return (
    <div className="w-full grid grid-cols-12 py-4 items-center">
      <div></div>
      <div className="flex justify-center space-x-8 col-span-10">
        <Select
          label="查詢年度："
          options={APP_CONFIG.YEAR_OPTIONS}
          selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === searchOption.year)}
          onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
        />
        <Select
          buttonClassName="w-36"
          label="資料呈現："
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
          搜尋
        </Button>
      </div>
      <div className="text-right">
        <Button onClick={() => {}}>Excel</Button>
      </div>
    </div>
  );
}
