import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Chart from '../../charts/Chart';
import Arrow from '../../components/arrow/Arrow';
import Legend from '../../components/legend/Legend';
import Tag from '../../components/tag/Tag';
import useAccumulationPeriod from '../../hooks/useAccumulationPeriod';
import useAdmin from '../../hooks/useAdmin';
import { ratioFormatter, baseFormatter } from '../../utils/formatter';
import { getTrend } from '../../utils/trend';

import AnalysisTable from './AnalysisTable';

export default function AnalysisPage({
  overview,
  chartOption,
  tableData,
  target,
  title = '',
  chartTitle = '',
  tableTitle = '',
  hasCategory = false,
  onRowChange = () => {},
  onSubRowChange = () => {},
  onDeleteRow = () => {},
  onDeleteSubRow = () => {},
}) {
  const { t } = useTranslation(['analysisPage', 'common']);
  const { accumulationPeriod } = useAccumulationPeriod();
  const { canEdit } = useAdmin();
  const navigate = useNavigate();
  return (
    <div className="flex h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-screen flex-col gap-4 overflow-hidden p-4">
      <div className="text-xl font-medium">{title}</div>
      <div className="flex items-end justify-between">
        <div
          className="flex cursor-pointer items-center space-x-2 text-gray-300 hover:text-green-50"
          onClick={() => navigate(-1)}>
          <ChevronLeftIcon className="h-5 w-5" />
          <div>{t('analysisPage:backDesc')}</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-gray-300">{t('analysisPage:aspDesc')}</div>
          <Tag>
            {t('common:accumulationRange')} : <span className="text-lg font-medium">{accumulationPeriod}</span>
          </Tag>
        </div>
      </div>
      <div className="grid flex-grow grid-cols-7 grid-rows-5 gap-4 overflow-auto">
        <div className="col-span-7 row-span-2 grid h-full w-full grid-cols-5 divide-x divide-divider rounded bg-primary-900 py-8 shadow">
          {overview &&
            overview.map(({ name, title, unit, value, subData = [], renderer = ratioFormatter }) => {
              const trend = getTrend(value, name);
              return (
                <div key={title} className="flex h-full flex-col justify-between px-8">
                  <div className="flex items-baseline space-x-2">
                    <div className="text-xl">{title}</div>
                    <div className="text-unit">{unit}</div>
                  </div>
                  <div className="flex h-1/2 items-center justify-center space-x-2 border-b border-primary-600">
                    <Arrow className={`h-14 w-14 ${trend.color}`} direction={trend.direction} />
                    <div className={`text-4xl font-bold ${trend.color}`}>{renderer(trend.value)}</div>
                  </div>
                  <div className="space-y-2 py-2">
                    {subData.map(({ key, value: _value, renderer: _renderer = baseFormatter }) => {
                      return (
                        <div className="flex w-full items-center justify-between px-4" key={key}>
                          <div className="text-unit">{key}</div>
                          <div className="text-2xl font-medium">{_renderer(_value)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="col-span-5 row-span-3 flex h-full flex-col space-y-4 rounded bg-primary-900 p-4 shadow">
          {tableData && (
            <AnalysisTable
              className="flex flex-grow flex-col"
              data={tableData}
              title={tableTitle}
              canEdit={canEdit}
              hasCategory={hasCategory}
              onRowChange={onRowChange}
              onSubRowChange={onSubRowChange}
              onDeleteRow={onDeleteRow}
              onDeleteSubRow={onDeleteSubRow}
            />
          )}
        </div>
        <div className="col-span-2 row-span-3 flex flex-col rounded bg-primary-900 p-4 shadow">
          <div className="text-xl font-medium">{chartTitle}</div>
          <div className="flex justify-end space-x-4">
            <Legend dotClassName="bg-_yellow" label={t('common:baseYear')} />
            <Legend dotClassName="bg-_orange" label={target} />
          </div>
          {chartOption && <Chart className="flex-grow" option={chartOption} />}
        </div>
      </div>
    </div>
  );
}
