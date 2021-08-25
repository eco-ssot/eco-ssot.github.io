import { useSelector } from 'react-redux';

import Carbon from './Carbon';
import Electricity from './Electricity';
import RenewableEnergy from './/RenewableEnergy';
import UnitElectricity from './UnitElectricity';
import Waste from './Waste';
import Water from './Water';

import Panel from '../../components/panel/Panel';
import Overview from './Overview';
import TagSelect from '../../components/select/TagSelect';
import { navigate } from '../../router/helpers';
import { useGetSummaryQuery } from '../../services/summary';
import { selectYear, selectBusiness } from '../../renderless/query-params/queryParamsSlice';
import APP_CONFIG from '../../constants/app-config';

export default function HomePage() {
  const compareYear = useSelector(selectYear);
  const business = useSelector(selectBusiness);
  const { data = {} } = useGetSummaryQuery({ business, year: compareYear });
  const {
    revenue,
    CO2Emission,
    electricPowerUtilization,
    renewableEnergy,
    singleElectric,
    waste,
    waterUse,
  } = data;

  const latestDate = revenue?.latestDate;
  return (
    <div className="grid grid-rows-3 grid-cols-3 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden">
      <Panel
        className="row-span-1 col-span-3"
        title="各數值 Overview"
        to="/overview"
        subtitle={
          <TagSelect
            options={APP_CONFIG.YEAR_OPTIONS}
            label="對比年度："
            selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === compareYear)}
            onChange={navigate}
            queryKey="year">
            {`累計區間：${
              latestDate
                ? `${new Date(latestDate).getFullYear()}.01 - ${String(
                    new Date(latestDate).getMonth() + 1
                  ).padStart(2, 0)}`
                : '-'
            }`}
          </TagSelect>
        }>
        <Overview
          data={data}
          compareYear={compareYear || APP_CONFIG.LAST_YEAR}
          currentYear={APP_CONFIG.CURRENT_YEAR}
        />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="碳排放量" to="/carbon">
        <Carbon
          data={CO2Emission}
          baseYear={APP_CONFIG.BASE_YEAR_CARBON}
          compareYear={compareYear || APP_CONFIG.LAST_YEAR}
          currentYear={APP_CONFIG.CURRENT_YEAR}
          latestDate={CO2Emission?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="可再生能源占比" to="/renewable-energy">
        <RenewableEnergy data={renewableEnergy} />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="用電強度" to="/electricity">
        <Electricity
          data={electricPowerUtilization?.intensity}
          baseYear={compareYear || APP_CONFIG.BASE_YEAR_ELECTRICITY}
          compareYear={compareYear || APP_CONFIG.LAST_YEAR}
          currentYear={APP_CONFIG.CURRENT_YEAR}
          latestDate={electricPowerUtilization?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="用水強度" to="/water">
        <Water
          data={waterUse?.intensity}
          baseYear={APP_CONFIG.BASE_YEAR_WATER}
          compareYear={compareYear || APP_CONFIG.LAST_YEAR}
          currentYear={APP_CONFIG.CURRENT_YEAR}
          latestDate={waterUse?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="單台用電" to="/unit-electricity">
        <UnitElectricity
          data={singleElectric}
          baseYear={compareYear || APP_CONFIG.BASE_YEAR_UNIT_ELECTRICITY}
          compareYear={compareYear || APP_CONFIG.LAST_YEAR}
          currentYear={APP_CONFIG.CURRENT_YEAR}
          latestDate={singleElectric?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="廢棄物產生密度" to="/waste">
        <Waste
          data={waste?.intensity}
          baseYear={APP_CONFIG.BASE_YEAR_WASTE}
          compareYear={compareYear || APP_CONFIG.LAST_YEAR}
          currentYear={APP_CONFIG.CURRENT_YEAR}
          latestDate={waste?.latestDate || latestDate}
        />
      </Panel>
    </div>
  );
}
