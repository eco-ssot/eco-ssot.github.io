import { useSelector } from 'react-redux';

import { selectBusiness } from '../renderless/location/locationSlice';
import { useGetSummaryQuery } from '../services/app';
import { formatMonthRange, getMaxDate } from '../utils/date';

export default function useAccumulationPeriod() {
  const business = useSelector(selectBusiness);
  const { data = {} } = useGetSummaryQuery({ business });
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
