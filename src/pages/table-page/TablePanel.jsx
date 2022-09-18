import { useMemo } from 'react';

import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import { usePrevious } from 'react-use';

import APP_CONSTANTS from '../../app/appConstants';
import useSitePlantOptions from '../../hooks/useSitePlantOptions';
import { useGetLatestDateQuery, useGetMissingPlantsQuery } from '../../services/app';

export default function TablePanel({ children }) {
  const { hash, pathname, search, state } = useLocation();
  const prevSearch = usePrevious(search);
  const option = useMemo(() => qs.parse(search), [search]);
  const prevOption = useMemo(() => qs.parse(prevSearch), [prevSearch]);
  const isHistory = useMemo(() => hash.slice(1) === APP_CONSTANTS.HISTORY_OPTIONS[1].key, [hash]);
  const isOverview = useMemo(() => pathname.startsWith('/overview'), [pathname]);
  const isElectricity = useMemo(() => pathname.startsWith('/electricity'), [pathname]);
  const showHistoryTab = useMemo(() => pathname !== '/waste/detail', [pathname]);
  const { data: missingPlants = [] } = useGetMissingPlantsQuery(
    {
      business: option.business,
      year: option.y,
      month: option.m,
      compare_year: option.compareYear,
      site: option.s,
      plant: option.p,
    },
    { skip: isHistory }
  );

  const { data: { currYear } = {} } = useGetLatestDateQuery(undefined, {
    skip: !isElectricity || (!option.p && !option.s) || option.y || isHistory,
  });

  const plantOptions = useSitePlantOptions(undefined, {
    skip: !isElectricity || (!option.p && !option.s) || option.y || isHistory,
  });

  const showElectricityIndex = useMemo(
    () =>
      !new RegExp(option.p || option.s, 'i').test(import.meta.env.VITE_ELECTRICITY_ANALYSIS_HIDDEN_PLANTS) &&
      isElectricity &&
      (option.p || option.s) &&
      (option.y || currYear) &&
      !isHistory &&
      plantOptions.filter(({ isPlant }) => isPlant).find(({ key }) => key === option.p || key === option.s),
    [option.p, option.s, isElectricity, option.y, currYear, isHistory, plantOptions]
  );

  const showBack = useMemo(() => state?.backToPage === true, [state]);
  return children({
    isHistory,
    isOverview,
    isElectricity,
    option,
    prevOption,
    missingPlants,
    showElectricityIndex,
    showHistoryTab,
    year: option.y || currYear,
    showBack,
  });
}
