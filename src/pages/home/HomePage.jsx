import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import { selectLatestDate, selectYoptions } from '../../app/appSlice';
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
import useNavigate from '../../router/useNavigate';
import { useGetSummaryQuery } from '../../services/summary';

import Carbon from './Carbon';
import Electricity from './Electricity';
import Overview from './Overview';
import OverviewNewMargin from './OverviewNewMargin';
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

  const isNewMargin = useMemo(() => business === 'Others', [business]);
  const navigate = useNavigate();
  const { CO2Emission, electricPowerUtilization, renewableEnergy, singleElectric, waste, waterUse, missing } = data;
  return (
    <div className="-mt-16 grid h-screen w-screen grid-cols-9 grid-rows-3 gap-4 overflow-hidden p-4 pt-20">
      <Panel
        title={t('overviewTitle')}
        className="col-span-8 row-span-1"
        to="/overview"
        subtitle={
          <>
            <div className="flex h-8 w-auto items-center rounded bg-primary-800 shadow">
              <div className="flex items-center pl-3">
                {t('accumulationRange')} : <GlobalDateSelect />
              </div>
              <Divider className="ml-0 border-primary-600" />
              <TagSelect
                options={cyOptions}
                label={t('compareYear')}
                selected={cyOptions.find((option) => option.key === compareYear)}
                onChange={navigate}
                queryKey="cy"
              />
            </div>
          </>
        }>
        {isNewMargin ? (
          <OverviewNewMargin data={data} />
        ) : (
          <Overview data={data} compareYear={compareYear || cyOptions[0].key} currentYear={y || yearOptions[0].key} />
        )}
      </Panel>
      <div className="col-span-1 row-span-1 flex h-full flex-col justify-between rounded bg-primary-900 p-4 shadow">
        <div className="text-xl font-medium text-gray-100">{t('dataMissing')}</div>
        <div className="grid max-h-[60%] grid-cols-2 overflow-y-auto ">
          {(y && y < 2022 ? [] : missing)?.map((val, i) => (
            <div key={i} className="text-center">
              {val}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center border-t border-primary-600 p-2 pb-0">
          <Link to="/management/data-status" className="flex w-full flex-col items-center underline">
            <div>{t('seeDetail')}</div>
            <div>{t('onSettingsPage')}</div>
          </Link>
        </div>
      </div>
      <Panel className="col-span-3 row-span-1 pb-2" title={t('carbonEmission')} to="/carbon">
        <Carbon
          data={CO2Emission}
          baseYear={APP_CONSTANTS.BASE_YEAR_CARBON}
          compareYear={compareYear || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={CO2Emission?.latestDate || latestDate}
          isNewMargin={isNewMargin}
        />
      </Panel>
      <Panel className="col-span-3 row-span-1 pb-1" title={t('renewableEnergyRatio')} to="/renewable-energy">
        <RenewableEnergy data={renewableEnergy} />
      </Panel>
      <Panel className="col-span-3 row-span-1 pb-2" title={t('electricityIntensity')} to="/electricity">
        <Electricity
          data={electricPowerUtilization?.intensity}
          baseYear={compareYear || cyOptions[0].key}
          compareYear={compareYear || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={electricPowerUtilization?.latestDate || latestDate}
          isNewMargin={isNewMargin}
        />
      </Panel>
      <Panel className="col-span-3 row-span-1 pb-2" title={t('waterIntensity')} to="/water">
        <Water
          data={waterUse?.intensity}
          baseYear={APP_CONSTANTS.BASE_YEAR_WATER}
          compareYear={compareYear || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={waterUse?.latestDate || latestDate}
          isNewMargin={isNewMargin}
        />
      </Panel>
      <Panel className="col-span-3 row-span-1 pb-2" title={t('unitElectricity')} to="/unit-electricity">
        <UnitElectricity
          data={singleElectric}
          baseYear={compareYear || cyOptions[0].key}
          compareYear={compareYear || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={CO2Emission?.latestDate || latestDate}
          isNewMargin={isNewMargin}
        />
      </Panel>
      <Panel className="col-span-3 row-span-1 pb-2" title={t('wasteEmissionDensity')} to="/waste">
        <Waste
          data={waste?.intensity}
          baseYear={APP_CONSTANTS.BASE_YEAR_WASTE}
          compareYear={compareYear || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={waste?.latestDate || latestDate}
          isNewMargin={isNewMargin}
        />
      </Panel>
    </div>
  );
}
