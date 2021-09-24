import { useMemo, useState } from 'react';

import { isNil } from 'lodash';

import Button from '../../components/button/Button';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import APP_CONFIG from '../../constants/app-config';
import { navigate } from '../../router/helpers';
import { useGetOverviewQuery } from '../../services/overview';

import { COLUMNS } from './OverviewTable';

export default function OverviewHistoryTable({ business, year, dimension }) {
  const option = { year, dimension };
  const { data } = useGetOverviewQuery({ business, ...option }, { skip: Object.values(option).every(isNil) });
  const columns = useMemo(() => COLUMNS({ currYear: year, lastYear: year - 1 }), [year]);
  const [searchOption, setSearchOption] = useState(option);
  return (
    <>
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
              navigate({
                business,
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
      {data && (
        <>
          <div className="w-full h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table
              columns={columns}
              data={data?.data || []}
              getRowProps={(row) => ({
                className: row.original.isFooter
                  ? 'border-b-2 border-t-2 border-primary-600'
                  : 'border-b border-divider',
              })}
            />
          </div>
        </>
      )}
    </>
  );
}
