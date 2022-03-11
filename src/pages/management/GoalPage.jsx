import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import Ellipsis from '../../components/ellipsis/Ellipsis';
import Select from '../../components/select/Select';
import usePlantPermission from '../../hooks/usePlantPermission';
import { selectP, selectS } from '../../renderless/location/locationSlice';
import {
  useGetGoalQuery,
  useGetCarbonIndexQuery,
  useGetTrecQuery,
  useGetTrecBySiteQuery,
} from '../../services/management';

import CarbonIndex from './CarbonIndex';
import Trec from './Trec';
import YearGoal from './YearGoal';

export default function GoalPage({ business, canEdit }) {
  const { t } = useTranslation(['managementPage', 'component']);
  const [goalYear, setGoalYear] = useState(APP_CONSTANTS.CURRENT_YEAR);
  const [carbonIndexYear, setCarbonIndexYear] = useState(APP_CONSTANTS.CURRENT_YEAR);
  const [tRecYear, setTrecYear] = useState(APP_CONSTANTS.CURRENT_YEAR);
  const plantPermission = usePlantPermission();
  const s = useSelector(selectS);
  const p = useSelector(selectP);
  const goalRes = useGetGoalQuery({ business, year: goalYear, site: s, plant: p });
  const carbonIndexRes = useGetCarbonIndexQuery({ year: carbonIndexYear });
  const tRecRes = useGetTrecQuery({ year: tRecYear });
  const tRecBySiteRes = useGetTrecBySiteQuery({ year: tRecYear, permission: plantPermission });
  return (
    <>
      <div className="row-span-1 col-span-7">
        <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
          <div className="flex justify-between">
            <div className="text-xl font-medium">{t('managementPage:yearGoal.title')}</div>
            <div className="flex items-center">
              <Select
                label={t('component:selectLabel.searchYear')}
                options={APP_CONSTANTS.YEAR_OPTIONS}
                selected={APP_CONSTANTS.YEAR_OPTIONS.find((option) => option.key === goalYear)}
                onChange={(e) => setGoalYear(e.key)}
                buttonClassName="min-w-28"
              />
            </div>
          </div>
          <YearGoal
            className="flex flex-col flex-grow"
            business={business}
            year={goalYear}
            data={goalRes.data?.data}
            canEdit={canEdit}
          />
        </div>
      </div>
      <div className="row-span-1 col-span-2">
        <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
          <div className="flex justify-between">
            <div className="flex space-x-2 items-baseline truncate">
              <Ellipsis className="text-xl font-medium" label={t('managementPage:carbonIndex.title')} />
              <Ellipsis className="text-unit" label={t('managementPage:carbonIndex.unit')} />
            </div>
            <div className="flex items-center">
              <Select
                label={t('component:selectLabel.searchYear')}
                options={APP_CONSTANTS.YEAR_OPTIONS}
                selected={APP_CONSTANTS.YEAR_OPTIONS.find((option) => option.key === carbonIndexYear)}
                onChange={(e) => setCarbonIndexYear(e.key)}
                buttonClassName="min-w-28"
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
      <div className="row-span-1 col-span-5">
        <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
          <div className="flex justify-between">
            <div className="text-xl font-medium">{t('managementPage:tRec.title')}</div>
            <div className="flex items-center">
              <Select
                label={t('component:selectLabel.searchYear')}
                options={APP_CONSTANTS.YEAR_OPTIONS}
                selected={APP_CONSTANTS.YEAR_OPTIONS.find((option) => option.key === tRecYear)}
                onChange={(e) => setTrecYear(e.key)}
                buttonClassName="min-w-28"
              />
            </div>
          </div>
          <Trec
            className="flex flex-col flex-grow"
            year={tRecYear}
            data={tRecRes.data?.data}
            dataBySite={tRecBySiteRes.data?.data}
            canEdit={canEdit}
          />
        </div>
      </div>
    </>
  );
}
