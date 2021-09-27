import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import { usePrevious } from 'react-use';

import APP_CONFIG from '../../constants/app-config';

export default function TablePanel({ children }) {
  const { hash, pathname, search } = useLocation();
  const prevSearch = usePrevious(search);
  const option = qs.parse(search);
  const prevOption = qs.parse(prevSearch);
  const isHistory = hash.slice(1) === APP_CONFIG.HISTORY_OPTIONS[1].key;
  const isOverview = pathname.startsWith('/overview');
  return children({
    isHistory,
    isOverview,
    option,
    prevOption,
  });
}
