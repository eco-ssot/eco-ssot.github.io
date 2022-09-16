import { useRef, useMemo } from 'react';

import clsx from 'clsx';
import { isEmpty } from 'lodash';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import Back from '../../components/back/Back';
import ButtonGroup from '../../components/button/ButtonGroup';
import useNavigate from '../../router/useNavigate';

import BaselinePanel, { BaselineSearch } from './BaselinePanel';
import ChartPanel from './ChartPanel';
import PowerSavingPanel from './PowerSavingPanel';
import PowerSavingPlanPanel from './PowerSavingPlanPanel';
import PredictionPanel, { PredictionSearch } from './PredictionPanel';

const BUTTON_GROUP_OPTIONS = [
  { key: 'BASELINE', value: 'baseline' },
  { key: 'PREDICTION', value: 'prediction' },
  { key: 'POWER_SAVING', value: 'powerSaving' },
];

export function TabPanel({ children }) {
  const { hash, search, state, pathname } = useLocation();
  const { lng, business, y, m, cy, s, p, pt, ...option } = qs.parse(search);
  const tabIndex = BUTTON_GROUP_OPTIONS.findIndex((option) => option.key === hash.slice(1));
  const baselineRef = useRef({});
  const predictionRef = useRef({});
  const powerSavingRef = useRef({});
  const refs = [baselineRef, predictionRef, powerSavingRef];
  const isBaseline = tabIndex <= 0;
  const isPrediction = tabIndex === 1;
  const isPowerSaving = tabIndex === 2;
  const showBack = useMemo(
    () =>
      (state?.from === '/decarbonization' || state?.from === '/management/decarbonization') &&
      (pathname === '/renewable-energy' ||
        pathname === '/carbon' ||
        pathname === '/carbon' ||
        pathname === '/analysis/electricity#POWER_SAVING' ||
        pathname === '/electricity'),
    [state, pathname]
  );
  return children({
    s,
    p,
    business,
    option,
    isBaseline,
    isPrediction,
    isPowerSaving,
    refs,
    tabIndex: tabIndex < 0 ? 0 : tabIndex,
    showBack,
  });
}

export default function ElectricityBaselinePage() {
  const { t } = useTranslation(['baselinePage', 'component']);
  const navigate = useNavigate();

  return (
    <>
      <TabPanel>
        {({ isBaseline, isPrediction, isPowerSaving, option, business, s, p, tabIndex, refs, showBack }) => (
          <>
            {showBack && <Back className="block" />}
            <div
              className={clsx(
                '-mt-16 grid w-screen grid-rows-5 gap-4 overflow-hidden p-4 pt-20',
                showBack ? 'h-[calc(100vh-2.5rem)]' : 'h-screen'
              )}
            >
              <div
                className={clsx(
                  'flex flex-col space-y-4 overflow-auto rounded bg-primary-900 p-4 shadow',
                  isPrediction || isEmpty(option) ? 'row-span-5' : 'row-span-3'
                )}
              >
                <div className="text-xl font-medium">
                  {isPowerSaving ? t('baselinePage:powerSaving.title') : t('baselinePage:title')}
                </div>
                <ButtonGroup
                  className="self-center"
                  options={BUTTON_GROUP_OPTIONS}
                  selected={BUTTON_GROUP_OPTIONS[tabIndex]}
                  onChange={(e) => {
                    navigate(
                      {
                        hash: e.key,
                        ...refs[BUTTON_GROUP_OPTIONS.findIndex((option) => option.key === e.key)].current,
                      },
                      { merge: false }
                    );

                    refs[tabIndex].current = option;
                  }}
                />
                <div className="flex w-full items-center justify-center">
                  {isBaseline && <BaselineSearch {...option} business={business} s={s} p={p} />}
                  {isPrediction && <PredictionSearch {...option} business={business} s={s} p={p} />}
                  {isPowerSaving && <BaselineSearch {...option} business={business} s={s} p={p} />}
                </div>
                {isBaseline && <BaselinePanel {...option} business={business} />}
                {isPrediction && <PredictionPanel {...option} business={business} s={s} p={p} />}
                {isPowerSaving && <PowerSavingPanel {...option} business={business} />}
              </div>
              {isBaseline && !isEmpty(option) && <ChartPanel {...option} business={business} />}
              {isPowerSaving && <PowerSavingPlanPanel {...option} business={business} />}
            </div>
          </>
        )}
      </TabPanel>
    </>
  );
}
