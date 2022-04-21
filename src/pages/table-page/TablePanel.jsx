import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import { usePrevious } from 'react-use';

import APP_CONSTANTS from '../../app/appConstants';
import useSitePlantOptions from '../../hooks/useSitePlantOptions';
import { useGetLatestDateQuery, useGetMissingPlantsQuery } from '../../services/app';

export default function TablePanel({ children }) {
  const { hash, pathname, search } = useLocation();
  const prevSearch = usePrevious(search);
  const option = qs.parse(search);
  const prevOption = qs.parse(prevSearch);
  const isHistory = hash.slice(1) === APP_CONSTANTS.HISTORY_OPTIONS[1].key;
  const isOverview = pathname.startsWith('/overview');
  const isElectricity = pathname.startsWith('/electricity');
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

  return children({
    isHistory,
    isOverview,
    isElectricity,
    option,
    prevOption,
    missingPlants,
    showElectricityIndex:
      isElectricity &&
      (option.p || option.s) &&
      (option.y || currYear) &&
      !isHistory &&
      plantOptions.filter(({ isPlant }) => isPlant).find(({ key }) => key === (option.p || option.s)),
    year: option.y || currYear,
  });
}
