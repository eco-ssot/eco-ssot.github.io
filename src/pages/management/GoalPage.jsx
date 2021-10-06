import { useState } from 'react';

import Select from '../../components/select/Select';
import APP_CONFIG from '../../constants/app-config';
import { useGetGoalQuery, useGetCarbonIndexQuery } from '../../services/app';

import CarbonIndex from './CarbonIndex';
import Trec from './Trec';
import YearGoal from './YearGoal';

export default function GoalPage({ business, canEdit }) {
  const [goalYear, setGoalYear] = useState(APP_CONFIG.CURRENT_YEAR);
  const [carbonIndexYear, setCarbonIndexYear] = useState(APP_CONFIG.CURRENT_YEAR);
  const [tRecYear, setTrecYear] = useState(APP_CONFIG.CURRENT_YEAR);
  const goalRes = useGetGoalQuery({ business, year: goalYear });
  const carbonIndexRes = useGetCarbonIndexQuery({ year: carbonIndexYear });
  return (
    <>
      <div className="row-span-1 col-span-7">
        <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
          <div className="flex justify-between">
            <div className="text-xl font-medium">年度目標</div>
            <div className="flex items-center">
              <Select
                label="查詢年度："
                options={APP_CONFIG.YEAR_OPTIONS}
                selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === goalYear)}
                onChange={(e) => setGoalYear(e.key)}
              />
            </div>
          </div>
          <YearGoal className="flex flex-col flex-grow" year={goalYear} data={goalRes.data?.data} canEdit={canEdit} />
        </div>
      </div>
      <div className="row-span-1 col-span-3">
        <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
          <div className="flex justify-between">
            <div className="flex space-x-2 items-baseline">
              <div className="text-xl font-medium">碳排放係數</div>
              <div className="text-unit">(公噸CO₂e/千度)</div>
            </div>
            <div className="flex items-center">
              <Select
                label="查詢年度："
                options={APP_CONFIG.YEAR_OPTIONS}
                selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === carbonIndexYear)}
                onChange={(e) => setCarbonIndexYear(e.key)}
              />
            </div>
          </div>
          <CarbonIndex
            className="flex flex-col flex-grow"
            year={carbonIndexYear}
            data={carbonIndexRes.data?.data}
            canEdit={canEdit}
          />
        </div>
      </div>
      <div className="row-span-1 col-span-4">
        <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
          <div className="flex justify-between">
            <div className="text-xl font-medium">綠證</div>
            <div className="flex items-center">
              <Select
                label="查詢年度："
                options={APP_CONFIG.YEAR_OPTIONS}
                selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === tRecYear)}
                onChange={(e) => setTrecYear(e.key)}
              />
            </div>
          </div>
          <Trec className="flex flex-col flex-grow" canEdit={canEdit} />
        </div>
      </div>
    </>
  );
}
