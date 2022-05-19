import { useMemo } from 'react';

import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import { selectCurrMonth, selectLatestDate, selectYoptions } from '../../app/appSlice';
import Divider from '../../components/divider/Divider';
import Panel from '../../components/panel/Panel';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import TagSelect from '../../components/select/TagSelect';
import {
  selectBusiness,
  selectCy,
  selectY,
  selectM,
  selectP,
  selectS,
  selectPt,
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
  const pt = useSelector(selectPt);
  const cy = useSelector(selectCy);
  const currMonth = useSelector(selectCurrMonth);
  const business = useSelector(selectBusiness);
  const yearOptions = useSelector(selectYoptions);
  const latestDate = useSelector(selectLatestDate);
  const { data } = useGetSummaryQuery({
    business,
    year: y,
    month: m,
    compare_year: cy,
    site: s,
    plant: p,
    ...(pt && {
      is_ytm: pt === APP_CONSTANTS.PERIOD_TYPES.YTM,
    }),
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
  return (
    <div className="-mt-16 grid h-screen w-screen grid-cols-9 grid-rows-3 gap-4 overflow-hidden p-4 pt-20">
      <Panel
        title={t('overviewTitle')}
        className="col-span-8 row-span-1"
        to="/overview"
        subtitle={
          <>
            <div className="flex h-8 w-auto items-center rounded bg-primary-800 shadow">
              <div className="flex items-center pl-1">
                <GlobalDateSelect />
              </div>
              {!isNewMargin && (
                <>
                  <Divider className="ml-0 border-primary-600" />
                  <TagSelect
                    options={cyOptions}
                    label={t('compareYear')}
                    selected={cyOptions.find((option) => option.key === cy)}
                    onChange={navigate}
                    queryKey="cy"
                  />
                </>
              )}
            </div>
          </>
        }>
        {isNewMargin ? (
          <OverviewNewMargin data={data} currMonth={m || currMonth} periodType={pt} />
        ) : (
          <Overview
            data={data}
            compareYear={cy || cyOptions[0].key}
            currentYear={y || yearOptions[0].key}
            currMonth={m || currMonth}
            periodType={pt}
          />
        )}
      </Panel>
      <div className="col-span-1 row-span-1 flex h-full flex-col justify-between rounded bg-primary-900 p-4 shadow">
        <div className="text-xl font-medium text-gray-100">{t('dataMissing')}</div>
        <div className="grid max-h-[60%] grid-cols-2 overflow-y-auto ">
          {(y && y < 2022 ? [] : data?.missing)?.map((val, i) => (
            <div key={i} className="text-center">
              {val}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center border-t border-primary-600 p-2 pb-0">
          <Link
            to={{
              pathname: '/management/data-status',
              search: qs.stringify({ business, y, m, s, p, pt, cy: cy }),
            }}
            className="flex w-full flex-col items-center underline">
            <div>{t('seeDetail')}</div>
            <div>{t('onSettingsPage')}</div>
          </Link>
        </div>
      </div>
      <Panel className="col-span-3 row-span-1 pb-2" title={t('carbonEmission')} to="/carbon">
        <Carbon
          data={data?.CO2Emission}
          baseYear={APP_CONSTANTS.BASE_YEAR_CARBON}
          compareYear={cy || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={data?.CO2Emission?.latestDate || latestDate}
          isNewMargin={isNewMargin}
          currMonth={m || currMonth}
          periodType={pt}
        />
      </Panel>
      <Panel className="col-span-3 row-span-1 pb-1" title={t('renewableEnergyRatio')} to="/renewable-energy">
        <RenewableEnergy data={data?.renewableEnergy} />
      </Panel>
      <Panel className="col-span-3 row-span-1 pb-2" title={t('electricityIntensity')} to="/electricity">
        <Electricity
          data={data?.electricPowerUtilization?.intensity}
          baseYear={cy || cyOptions[0].key}
          compareYear={cy || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={data?.electricPowerUtilization?.latestDate || latestDate}
          isNewMargin={isNewMargin}
          currMonth={m || currMonth}
          periodType={pt}
        />
      </Panel>
      <Panel className="col-span-3 row-span-1 pb-2" title={t('waterIntensity')} to="/water">
        <Water
          data={data?.waterUse?.intensity}
          baseYear={APP_CONSTANTS.BASE_YEAR_WATER}
          compareYear={cy || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={data?.waterUse?.latestDate || latestDate}
          isNewMargin={isNewMargin}
          currMonth={m || currMonth}
          periodType={pt}
        />
      </Panel>
      <Panel className="col-span-3 row-span-1 pb-2" title={t('unitElectricity')} to="/unit-electricity">
        <UnitElectricity
          data={data?.singleElectric}
          baseYear={cy || cyOptions[0].key}
          compareYear={cy || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={data?.CO2Emission?.latestDate || latestDate}
          isNewMargin={isNewMargin}
          currMonth={m || currMonth}
          periodType={pt}
        />
      </Panel>
      <Panel className="col-span-3 row-span-1 pb-2" title={t('wasteEmissionDensity')} to="/waste">
        <Waste
          data={data?.waste?.intensity}
          baseYear={APP_CONSTANTS.BASE_YEAR_WASTE}
          compareYear={cy || cyOptions[0].key}
          currentYear={y || yearOptions[0].key}
          latestDate={data?.waste?.latestDate || latestDate}
          isNewMargin={isNewMargin}
          currMonth={m || currMonth}
          periodType={pt}
        />
      </Panel>
    </div>
  );
}
