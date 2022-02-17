import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import { usePrevious } from 'react-use';

import APP_CONSTANTS from '../../app/appConstants';
import { useGetSummaryQuery } from '../../services/app';

export default function TablePanel({ children }) {
  const { hash, pathname, search } = useLocation();
  const prevSearch = usePrevious(search);
  const option = qs.parse(search);
  const prevOption = qs.parse(prevSearch);
  const isHistory = hash.slice(1) === APP_CONSTANTS.HISTORY_OPTIONS[1].key;
  const isOverview = pathname.startsWith('/overview');
  useGetSummaryQuery({
    business: option?.business,
    year: option?.y,
    month: option?.m,
    compare_year: option?.compareYear,
  });

  return children({
    isHistory,
    isOverview,
    option,
    prevOption,
  });
}
