import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import YearGoal from './YearGoal';
import CarbonIndex from './CarbonIndex';
import Trec from './Trec';

import { useKeycloak } from '../../keycloak';
import Button from '../../components/button/Button';
import Select from '../../components/select/Select';
import APP_CONFIG from '../../constants/app-config';
import { useGetGoalQuery, useGetCarbonIndexQuery } from '../../services/app';
import { selectBusiness } from '../../renderless/location/locationSlice';

const YEAR_OPTIONS = [{ key: APP_CONFIG.CURRENT_YEAR, value: APP_CONFIG.CURRENT_YEAR }, ...APP_CONFIG.YEAR_OPTIONS];

export default function ManagementPage() {
  const { keycloak } = useKeycloak();
  const [goalYear, setGoalYear] = useState(APP_CONFIG.CURRENT_YEAR);
  const [carbonIndexYear, setCarbonIndexYear] = useState(APP_CONFIG.CURRENT_YEAR);
  const [tRecYear, setTrecYear] = useState(APP_CONFIG.CURRENT_YEAR);
  const business = useSelector(selectBusiness);
  const goalRes = useGetGoalQuery({ business, year: goalYear });
  const carbonIndexRes = useGetCarbonIndexQuery({ year: carbonIndexYear });
  const logout = useCallback(() => {
    keycloak?.logout();
  }, [keycloak]);

  const { family_name = '-', given_name = '-', preferred_username = '-' } = keycloak?.idTokenParsed || {};
  const roles = (keycloak?.realmAccess?.roles || []).filter((r) => !APP_CONFIG.KEYCLOAK_DEFAULT_ROLES.includes(r));
  const canEdit = roles.includes(APP_CONFIG.MAINTAINER_ROLE);
  return (
    <div className="grid grid-cols-6 grid-rows-2 max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] w-full p-4 gap-4 overflow-hidden">
      <div className="row-span-2 col-span-1">
        <div className="bg-primary-900 rounded shadow p-4 h-full flex flex-col">
          <div className="flex flex-grow flex-col space-y-8">
            <div className="text-xl font-medium">管理者資訊</div>
            <div className="space-y-2">
              <div className="text-primary-600">User Name</div>
              <div>{given_name}</div>
              <div>{family_name}</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary-600">Department</div>
              <div>-</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary-600">ID</div>
              <div>{preferred_username}</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary-600">Level</div>
              {roles.map((role) => (
                <div key={role}>{role}</div>
              ))}
            </div>
          </div>
          <div className="border-t border-divider text-center">
            <Button className="mt-4" onClick={() => logout()}>
              登出
            </Button>
          </div>
        </div>
      </div>
      <div className="row-span-1 col-span-5">
        <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
          <div className="flex justify-between">
            <div className="text-xl font-medium">年度目標</div>
            <div className="flex items-center">
              <Select
                label="查詢年度："
                options={YEAR_OPTIONS}
                selected={YEAR_OPTIONS.find((option) => option.key === goalYear)}
                onChange={(e) => setGoalYear(e.key)}
              />
            </div>
          </div>
          <YearGoal className="flex flex-col flex-grow" year={goalYear} data={goalRes.data?.data} canEdit={canEdit} />
        </div>
      </div>
      <div className="row-span-1 col-span-2">
        <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
          <div className="flex justify-between">
            <div className="flex space-x-2 items-baseline">
              <div className="text-xl font-medium">碳排放係數</div>
              <div className="text-unit">(公噸CO₂e/千度)</div>
            </div>
            <div className="flex items-center">
              <Select
                label="查詢年度："
                options={YEAR_OPTIONS}
                selected={YEAR_OPTIONS.find((option) => option.key === carbonIndexYear)}
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
      <div className="row-span-1 col-span-3">
        <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
          <div className="flex justify-between">
            <div className="text-xl font-medium">綠證</div>
            <div className="flex items-center">
              <Select
                label="查詢年度："
                options={YEAR_OPTIONS}
                selected={YEAR_OPTIONS.find((option) => option.key === tRecYear)}
                onChange={(e) => setTrecYear(e.key)}
              />
            </div>
          </div>
          <Trec className="flex flex-col flex-grow" canEdit={canEdit} />
        </div>
      </div>
    </div>
  );
}
