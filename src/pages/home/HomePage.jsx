import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Panel from '../../components/panel/Panel';
import TagSelect from '../../components/select/TagSelect';
import APP_CONFIG from '../../constants/app-config';
import { selectYear, selectBusiness } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import { useGetSummaryQuery } from '../../services/app';
import { formatMonthRange, getMaxDate } from '../../utils/date';

import RenewableEnergy from './/RenewableEnergy';
import Carbon from './Carbon';
import Electricity from './Electricity';
import Overview from './Overview';
import UnitElectricity from './UnitElectricity';
import Waste from './Waste';
import Water from './Water';

export default function HomePage() {
  const { t } = useTranslation(['homePage']);
  const compareYear = useSelector(selectYear);
  const business = useSelector(selectBusiness);
  const { data = {} } = useGetSummaryQuery({ business, year: compareYear });
  const { revenue, CO2Emission, electricPowerUtilization, renewableEnergy, singleElectric, waste, waterUse } = data;
  const latestDate = getMaxDate(
    revenue?.latestDate,
    electricPowerUtilization?.latestDate,
    CO2Emission?.latestDate,
    waterUse?.latestDate,
    waste?.latestDate
  );

  return (
    <div className="grid grid-rows-3 grid-cols-12 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden">
      <Panel
        title={t('overviewTitle')}
        className="row-span-1 col-span-11"
        to="/overview"
        subtitle={
          <TagSelect
            options={APP_CONFIG.YEAR_OPTIONS.slice(1)}
            label={`${t('compareYear')}：`}
            selected={APP_CONFIG.YEAR_OPTIONS.find((option) => option.key === compareYear)}
            onChange={navigate}
            queryKey="year">
            {t('accumulationRange')}：<span className="text-lg font-medium">{formatMonthRange(latestDate)}</span>
          </TagSelect>
        }>
        <Overview data={data} compareYear={compareYear || APP_CONFIG.LAST_YEAR} currentYear={APP_CONFIG.CURRENT_YEAR} />
      </Panel>
      <Panel
        className="row-span-1 col-span-1"
        subtitle={<div className="text-xl font-medium text-gray-100">資料缺漏 Site</div>}>
        <div className="flex flex-col h-full w-full items-center">
          <div className="flex flex-grow"></div>
          <div className="border-t border-primary-600 w-full p-2 flex justify-center">
            <Link to="/management/data-status" className="underline">
              <div>前往後台設定</div>
              <div>查看資料詳情</div>
            </Link>
          </div>
        </div>
      </Panel>
      <Panel className="row-span-1 col-span-4 pb-2" title={t('carbonEmission')} to="/carbon">
        <Carbon
          data={CO2Emission}
          baseYear={APP_CONFIG.BASE_YEAR_CARBON}
          compareYear={compareYear || APP_CONFIG.LAST_YEAR}
          currentYear={APP_CONFIG.CURRENT_YEAR}
          latestDate={CO2Emission?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-4 pb-1" title={t('renewableEnergyRatio')} to="/renewable-energy">
        <RenewableEnergy data={renewableEnergy} />
      </Panel>
      <Panel className="row-span-1 col-span-4 pb-2" title={t('electricityIntensity')} to="/electricity">
        <Electricity
          data={electricPowerUtilization?.intensity}
          baseYear={compareYear || APP_CONFIG.BASE_YEAR_ELECTRICITY}
          compareYear={compareYear || APP_CONFIG.LAST_YEAR}
          currentYear={APP_CONFIG.CURRENT_YEAR}
          latestDate={electricPowerUtilization?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-4 pb-2" title={t('waterIntensity')} to="/water">
        <Water
          data={waterUse?.intensity}
          baseYear={APP_CONFIG.BASE_YEAR_WATER}
          compareYear={compareYear || APP_CONFIG.LAST_YEAR}
          currentYear={APP_CONFIG.CURRENT_YEAR}
          latestDate={waterUse?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-4 pb-2" title={t('unitElectricity')} to="/unit-electricity">
        <UnitElectricity
          data={singleElectric}
          baseYear={compareYear || APP_CONFIG.BASE_YEAR_UNIT_ELECTRICITY}
          compareYear={compareYear || APP_CONFIG.LAST_YEAR}
          currentYear={APP_CONFIG.CURRENT_YEAR}
          latestDate={singleElectric?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-4 pb-2" title={t('wasteEmissionDensity')} to="/waste">
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
