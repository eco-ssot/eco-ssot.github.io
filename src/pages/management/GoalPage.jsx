import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import Ellipsis from '../../components/ellipsis/Ellipsis';
import Select from '../../components/select/Select';
import useAdmin from '../../hooks/useAdmin';
import usePlantPermission from '../../hooks/usePlantPermission';
import { selectBusiness, selectP, selectS } from '../../renderless/location/locationSlice';
import {
  useGetGoalQuery,
  useGetCarbonIndexQuery,
  useGetTrecQuery,
  useGetTrecBySiteQuery,
} from '../../services/management';

import CarbonIndex from './CarbonIndex';
import Trec from './Trec';
import YearGoal from './YearGoal';

export default function GoalPage() {
  const { t } = useTranslation(['managementPage', 'component']);
  const [goalYear, setGoalYear] = useState(APP_CONSTANTS.CURRENT_YEAR);
  const [carbonIndexYear, setCarbonIndexYear] = useState(APP_CONSTANTS.CURRENT_YEAR);
  const [tRecYear, setTrecYear] = useState(APP_CONSTANTS.CURRENT_YEAR);
  const plantPermission = usePlantPermission();
  const business = useSelector(selectBusiness);
  const s = useSelector(selectS);
  const p = useSelector(selectP);
  const { canEdit } = useAdmin();
  const goalRes = useGetGoalQuery({ business, year: goalYear, site: s, plant: p });
  const carbonIndexRes = useGetCarbonIndexQuery({ year: carbonIndexYear });
  const tRecRes = useGetTrecQuery({ year: tRecYear });
  const tRecBySiteRes = useGetTrecBySiteQuery({ year: tRecYear, permission: plantPermission });
  return (
    <>
      <div className="col-span-7 row-span-1">
        <div className="flex h-full flex-col space-y-4 rounded bg-primary-900 p-4 shadow">
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
            className="flex flex-grow flex-col"
            business={business}
            year={goalYear}
            data={goalRes.data?.data}
            canEdit={canEdit}
          />
        </div>
      </div>
      <div className="col-span-2 row-span-1">
        <div className="flex h-full flex-col space-y-4 rounded bg-primary-900 p-4 shadow">
          <div className="flex justify-between">
            <div className="flex items-baseline space-x-2 truncate">
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
            className="flex flex-grow flex-col"
            year={carbonIndexYear}
            data={carbonIndexRes.data?.data}
            canEdit={canEdit}
          />
        </div>
      </div>
      <div className="col-span-5 row-span-1">
        <div className="flex h-full flex-col space-y-4 rounded bg-primary-900 p-4 shadow">
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
            className="flex flex-grow flex-col"
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
