import { useSelector } from 'react-redux';

import { selectBusiness, selectM, selectY } from '../renderless/location/locationSlice';
import { useGetSummaryQuery } from '../services/summary';
import { formatMonthRange, getMaxDate } from '../utils/date';

export default function useAccumulationPeriod() {
  const business = useSelector(selectBusiness);
  const y = useSelector(selectY);
  const m = useSelector(selectM);
  const { data = {} } = useGetSummaryQuery({ business, year: y, month: m });
  const { revenue, CO2Emission, electricPowerUtilization, waste, waterUse } = data;
  const latestDate = getMaxDate(
    revenue?.latestDate,
    electricPowerUtilization?.latestDate,
    CO2Emission?.latestDate,
    waterUse?.latestDate,
    waste?.latestDate
  );

  return { latestDate, accumulationPeriod: formatMonthRange(latestDate) };
}
