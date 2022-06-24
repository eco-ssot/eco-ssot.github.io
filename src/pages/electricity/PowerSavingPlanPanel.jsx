import { useEffect, useMemo, useState } from 'react';

import { isNil, groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';

import Table from '../../components/table/Table';
import { useGetElectricityPowerSavingQuery } from '../../services/electricity';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns } from '../../utils/table';

const POWER_SAVING_PLAN_COLUMNS = (t) =>
  addPaddingColumns([
    {
      Header: t('baselinePage:powerSaving.table.electricityType'),
      accessor: 'category',
      className: 'text-center w-24',
      Cell: (cell) => t(`baselinePage:powerSaving.table.${cell.value}`),
    },
    ...Array.from({ length: 12 }, (_, i) => ({
      Header: t(`common:month.${i + 1}月`),
      accessor: String(i + 1),
      className: 'text-right',
      Cell: baseFormatter,
    })),
    {
      Header: t('baselinePage:powerSaving.table.total'),
      accessor: 'ttl',
      className: 'text-right',
      Cell: baseFormatter,
    },
  ]);

export default function PowerSavingPlanPanel({ year, plant }) {
  const { t } = useTranslation(['baselinePage', 'common']);
  const { data } = useGetElectricityPowerSavingQuery({ year, plant }, { skip: !year || !plant });
  const [_data, setData] = useState(data?.data);
  const columns = useMemo(() => POWER_SAVING_PLAN_COLUMNS(t), [t]);
  useEffect(() => {
    if (data) {
      const groupByCategory = groupBy(data.data, ({ category }) => category);
      const table = Object.entries(groupByCategory).reduce((prev, [key, values]) => {
        const ttlByMonth = values.reduce(
          (_prev, _curr) => ({
            ..._prev,
            ...Array.from({ length: 12 }).reduce(
              (__prev, __curr, i) => ({
                ...__prev,
                [i + 1]: (_prev[i + 1] || 0) + (_curr.expected_benefits?.[i + 1] || 0),
              }),
              {}
            ),
          }),
          {}
        );

        const ttl = Object.values(ttlByMonth).reduce((prev, curr) => prev + curr, 0);
        return prev.concat({ ...ttlByMonth, ttl, category: key });
      }, []);

      setData(table);
    }
  }, [data]);

  if (isNil(data)) {
    return null;
  }

  return (
    <div className="row-span-2 flex h-full flex-col space-y-2 rounded bg-primary-900 p-4 shadow">
      <div className="text-lg font-medium">{t('baselinePage:powerSaving.subTitle')}</div>
      <div className="flex w-full flex-grow flex-col overflow-auto rounded-t-lg shadow">
        <Table columns={columns} data={_data} />
      </div>
    </div>
  );
}
