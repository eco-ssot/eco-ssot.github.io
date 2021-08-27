import { useSelector } from 'react-redux';

import { selectHash } from '../renderless/location/locationSlice';
import APP_CONFIG from '../constants/app-config';

export default function useIsHistory() {
  const hash = useSelector(selectHash);
  return hash.slice(1) === APP_CONFIG.HISTORY_OPTIONS[1].key;
}
