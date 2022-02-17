import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import { selectLatestDate, selectMissingPlants, selectYoptions } from '../../app/appSlice';
import Divider from '../../components/divider/Divider';
import Panel from '../../components/panel/Panel';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import TagSelect from '../../components/select/TagSelect';
import {
  selectBusiness,
  selectCompareYear,
  selectY,
  selectM,
  selectP,
  selectS,
} from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import { useGetSummaryQuery } from '../../services/app';

import Carbon from './Carbon';
import Electricity from './Electricity';
import Overview from './Overview';
import RenewableEnergy from './RenewableEnergy';
import UnitElectricity from './UnitElectricity';
import Waste from './Waste';
import Water from './Water';

export default function HomePage() {
  const { t } = useTranslation(['homePage']);
  const y = useSelector(selectY);
  const m = useSelector(selectM);
  const s = useSelector(selectS);
  const p = useSelector(selectP);
  const compareYear = useSelector(selectCompareYear);
  const business = useSelector(selectBusiness);
  const yearOptions = useSelector(selectYoptions);
  const missingPlants = useSelector(selectMissingPlants);
  const latestDate = useSelector(selectLatestDate);
  const { data = {} } = useGetSummaryQuery({
    business,
    year: y,
    month: m,
    compare_year: compareYear,
    site: s,
    plant: p,
  });

  const cyOptions = useMemo(
    () =>
      (y ? yearOptions.filter((option) => Number(option.key) < Number(y)) : yearOptions.slice(1)).filter(
        (option) => Number(option.key) > 2019
      ),
    [yearOptions, y]
  );

  const { CO2Emission, electricPowerUtilization, renewableEnergy, singleElectric, waste, waterUse } = data;
  return (
    <div className="grid grid-rows-3 grid-cols-9 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden">
      <Panel
        title={t('overviewTitle')}
        className="row-span-1 col-span-8"
        to="/overview"
        subtitle={
          <>
            <div className="w-auto h-8 items-center flex rounded shadow bg-primary-800">
              <div className="pl-3 flex items-center">
                {`${t('accumulationRange')} : `}
                <GlobalDateSelect />
              </div>
              <Divider className="border-primary-600 ml-0" />
              <TagSelect
                options={cyOptions}
                label={`${t('compareYear')} : `}
                selected={cyOptions.find((option) => option.key === compareYear)}
                onChange={navigate}
                queryKey="cy"
              />
            </div>
          </>
        }>
        <Overview data={data} compareYear={compareYear || cyOptions[0].key} currentYear={y || yearOptions[0].key} />
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
          baseYear={APP_CONSTANTS.BASE_YEAR_CARBON}
          compareYear={compareYear || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={CO2Emission?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-3 pb-1" title={t('renewableEnergyRatio')} to="/renewable-energy">
        <RenewableEnergy data={renewableEnergy} />
      </Panel>
      <Panel className="row-span-1 col-span-3 pb-2" title={t('electricityIntensity')} to="/electricity">
        <Electricity
          data={electricPowerUtilization?.intensity}
          baseYear={compareYear || cyOptions[0].key}
          compareYear={compareYear || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={electricPowerUtilization?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-3 pb-2" title={t('waterIntensity')} to="/water">
        <Water
          data={waterUse?.intensity}
          baseYear={APP_CONSTANTS.BASE_YEAR_WATER}
          compareYear={compareYear || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={waterUse?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-3 pb-2" title={t('unitElectricity')} to="/unit-electricity">
        <UnitElectricity
          data={singleElectric}
          baseYear={compareYear || cyOptions[0].key}
          compareYear={compareYear || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={singleElectric?.latestDate || latestDate}
        />
      </Panel>
      <Panel className="row-span-1 col-span-3 pb-2" title={t('wasteEmissionDensity')} to="/waste">
        <Waste
          data={waste?.intensity}
          baseYear={APP_CONSTANTS.BASE_YEAR_WASTE}
          compareYear={compareYear || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={waste?.latestDate || latestDate}
        />
      </Panel>
    </div>
  );
}
