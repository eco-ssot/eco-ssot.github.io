import { useHistory } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';

import AnalysisTable from './AnalysisTable';
import Chart from '../../charts/Chart';
import Tag from '../../components/tag/Tag';
import Arrow from '../../components/arrow/Arrow';
import { ratioFormatter, baseFormatter } from '../../utils/formatter';
import { getTrend } from '../../utils/trend';
import Legend from '../../components/legend/Legend';
import { selectSite } from '../../renderless/location/locationSlice';

export default function AnalysisPage({ title, chartTitle, overview, chartOption, tableData, target }) {
  const history = useHistory();
  const site = useSelector(selectSite);
  return (
    <div className="flex flex-col p-4 gap-4 w-screen max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] overflow-hidden">
      <div className="text-xl font-medium">{`${title} ${site ? `Site: (${site})` : ''}`}</div>
      <div className="flex justify-between items-end">
        <div
          className="flex text-gray-300 cursor-pointer space-x-2 items-center hover:text-green-50"
          onClick={() => history.goBack()}>
          <ChevronLeftIcon className="w-5 h-5" />
          <div>返回上一頁</div>
        </div>
        <Tag>
          累計區間：<span className="text-lg font-medium">2021.01 - 06</span>
        </Tag>
      </div>
      <div className="grid grid-rows-5 grid-cols-7 flex-grow gap-4 overflow-auto">
        <div className="row-span-2 col-span-7 bg-primary-900 rounded shadow py-8 grid h-full w-full divide-x divide-divider grid-cols-5">
          {overview &&
            overview.map(({ title, unit, value, subData = [], renderer = ratioFormatter }) => {
              const trend = getTrend(value, title);
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
          {tableData && <AnalysisTable className="flex flex-col flex-grow" data={tableData} />}
        </div>
        <div className="row-span-3 col-span-2 bg-primary-900 rounded shadow p-4 flex flex-col">
          <div className="text-xl font-medium">{chartTitle}</div>
          <div className="flex justify-end space-x-4">
            <Legend dotClassName="bg-_yellow" label="基準年" />
            <Legend dotClassName="bg-_orange" label={`目標 : ${target || '-'}`} />
          </div>
          {chartOption && <Chart className="flex-grow" option={chartOption} />}
        </div>
      </div>
    </div>
  );
}
