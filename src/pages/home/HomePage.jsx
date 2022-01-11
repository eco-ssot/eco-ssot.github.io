import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectLatestDate, selectMissingPlants, selectYearOptions } from '../../app/appSlice';
import Panel from '../../components/panel/Panel';
import TagSelect from '../../components/select/TagSelect';
import APP_CONFIG from '../../constants/app-config';
import { selectYear, selectBusiness } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import { useGetSummaryQuery } from '../../services/app';
import { formatMonthRange } from '../../utils/date';

import Carbon from './Carbon';
import Electricity from './Electricity';
import Overview from './Overview';
import RenewableEnergy from './RenewableEnergy';
import UnitElectricity from './UnitElectricity';
import Waste from './Waste';
import Water from './Water';

export default function HomePage() {
  const { t } = useTranslation(['homePage']);
  const compareYear = useSelector(selectYear);
  const business = useSelector(selectBusiness);
  const yearOptions = useSelector(selectYearOptions);
  const missingPlants = useSelector(selectMissingPlants);
  const latestDate = useSelector(selectLatestDate);
  const { data = {} } = useGetSummaryQuery({ business, year: compareYear });
  const { CO2Emission, electricPowerUtilization, renewableEnergy, singleElectric, waste, waterUse } = data;
  return (
    <div className="grid grid-rows-3 grid-cols-9 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden">
      <Panel
        title={t('overviewTitle')}
        className="row-span-1 col-span-8"
        to="/overview"
        subtitle={
          <TagSelect
            options={yearOptions?.slice(1)}
            label={`${t('compareYear')} : `}
            selected={yearOptions?.find((option) => option.key === compareYear)}
            onChange={navigate}
            queryKey="year">
            {t('accumulationRange')} : <span className="text-lg font-medium">{formatMonthRange(latestDate)}</span>
          </TagSelect>
        }>
        <Overview
          data={data}
          compareYear={compareYear || yearOptions?.[1]?.key}
          currentYear={yearOptions?.[0]?.key || APP_CONFIG.CURRENT_YEAR}
        />
      </Panel>
      <div className="row-span-1 col-span-1 h-full bg-primary-900 rounded shadow p-4 flex flex-col justify-between">
        <div className="text-xl font-medium text-gray-100">{t('dataMissing')}</div>
        <div className="grid grid-cols-2 overflow-y-auto max-h-[60%] ">
          {missingPlants?.map((val, i) => (
            <div key={i} className="text-center">
              {val}
            </div>
          ))}
        </div>
        <div className="border-t border-primary-600 w-full p-2 pb-0 flex justify-center">
          <Link to="/management/data-status" className="underline w-full items-center flex flex-col">
            <div>{t('seeDetail')}</div>
            <div>{t('onSettingsPage')}</div>
          </Link>
        </div>
      </div>
      <Panel className="row-span-1 col-span-3 pb-2" title={t('carbonEmission')} to="/carbon">
        <Carbon
          data={CO2Emission}
          baseYear={APP_CONFIG.BASE_YEAR_CARBON}
          compareYear={compareYear || yearOptions?.[1]?.key || APP_CONFIG.LAST_YEAR}
          currentYear={yearOptions?.[0]?.key || APP_CONFIG.CURRENT_YEAR}
          latestDate={CO2Emission?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-3 pb-1" title={t('renewableEnergyRatio')} to="/renewable-energy">
        <RenewableEnergy data={renewableEnergy} />
      </Panel>
      <Panel className="row-span-1 col-span-3 pb-2" title={t('electricityIntensity')} to="/electricity">
        <Electricity
          data={electricPowerUtilization?.intensity}
          baseYear={compareYear || APP_CONFIG.BASE_YEAR_ELECTRICITY}
          compareYear={compareYear || yearOptions?.[1]?.key || APP_CONFIG.LAST_YEAR}
          currentYear={yearOptions?.[0]?.key || APP_CONFIG.CURRENT_YEAR}
          latestDate={electricPowerUtilization?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-3 pb-2" title={t('waterIntensity')} to="/water">
        <Water
          data={waterUse?.intensity}
          baseYear={APP_CONFIG.BASE_YEAR_WATER}
          compareYear={compareYear || yearOptions?.[1]?.key || APP_CONFIG.LAST_YEAR}
          currentYear={yearOptions?.[0]?.key || APP_CONFIG.CURRENT_YEAR}
          latestDate={waterUse?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-3 pb-2" title={t('unitElectricity')} to="/unit-electricity">
        <UnitElectricity
          data={singleElectric}
          baseYear={compareYear || APP_CONFIG.BASE_YEAR_UNIT_ELECTRICITY}
          compareYear={compareYear || yearOptions?.[1]?.key || APP_CONFIG.LAST_YEAR}
          currentYear={yearOptions?.[0]?.key || APP_CONFIG.CURRENT_YEAR}
          latestDate={singleElectric?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-3 pb-2" title={t('wasteEmissionDensity')} to="/waste">
        <Waste
          data={waste?.intensity}
          baseYear={APP_CONFIG.BASE_YEAR_WASTE}
          compareYear={compareYear || yearOptions?.[1]?.key || APP_CONFIG.LAST_YEAR}
          currentYear={yearOptions?.[0]?.key || APP_CONFIG.CURRENT_YEAR}
          latestDate={waste?.latestDate || latestDate}
        />
      </Panel>
    </div>
  );
}
