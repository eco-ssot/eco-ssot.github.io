import { useSelector } from 'react-redux';

import APP_CONFIG from '../constants/app-config';
import { selectHash } from '../renderless/location/locationSlice';

export default function useIsHistory() {
  const hash = useSelector(selectHash);
  return hash.slice(1) === APP_CONFIG.HISTORY_OPTIONS[1].key;
}
