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
    <div className="flex flex-col p-4 gap-4 w-screen max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] overflow-hidden">
      <div className="text-xl font-medium">{title}</div>
      <div className="flex justify-between items-end">
        <div
          className="flex text-gray-300 cursor-pointer space-x-2 items-center hover:text-green-50"
          onClick={() => navigate(-1)}>
          <ChevronLeftIcon className="w-5 h-5" />
          <div>{t('analysisPage:backDesc')}</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-gray-300">{t('analysisPage:aspDesc')}</div>
          <Tag>
            {t('common:accumulationRange')} : <span className="text-lg font-medium">{accumulationPeriod}</span>
          </Tag>
        </div>
      </div>
      <div className="grid grid-rows-5 grid-cols-7 flex-grow gap-4 overflow-auto">
        <div className="row-span-2 col-span-7 bg-primary-900 rounded shadow py-8 grid h-full w-full divide-x divide-divider grid-cols-5">
          {overview &&
            overview.map(({ name, title, unit, value, subData = [], renderer = ratioFormatter }) => {
              const trend = getTrend(value, name);
              return (
                <div key={title} className="h-full flex flex-col justify-between px-8">
                  <div className="flex space-x-2 items-baseline">
                    <div className="text-xl">{title}</div>
                    <div className="text-unit">{unit}</div>
                  </div>
                  <div className="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600">
                    <Arrow className={`w-14 h-14 ${trend.color}`} direction={trend.direction} />
                    <div className={`text-4xl font-bold ${trend.color}`}>{renderer(trend.value)}</div>
                  </div>
                  <div className="space-y-2 py-2">
                    {subData.map(({ key, value: _value, renderer: _renderer = baseFormatter }) => {
                      return (
                        <div className="flex justify-between w-full items-center px-4" key={key}>
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
        <div className="row-span-3 col-span-5 bg-primary-900 rounded shadow p-4 space-y-4 flex flex-col h-full">
          {tableData && (
            <AnalysisTable
              className="flex flex-col flex-grow"
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
        <div className="row-span-3 col-span-2 bg-primary-900 rounded shadow p-4 flex flex-col">
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
