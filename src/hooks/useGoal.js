import { useSelector } from 'react-redux';

import { selectBusiness, selectLanguage } from '../renderless/location/locationSlice';
import { useGetGoalQuery } from '../services/app';
import { getTargetLabel } from '../utils/label';
import { getDecimalNumber } from '../utils/number';

export default function useGoal({ keyword, isHistory = false } = {}) {
  const currYear = new Date().getFullYear();
  const business = useSelector(selectBusiness);
  const lng = useSelector(selectLanguage);
  const { data: { data = [] } = {} } = useGetGoalQuery({ business, year: currYear });
  const { baseYear, target = '' } = data.filter((d) => new RegExp(keyword).test(d.category))[0] || {};
  const pct = getDecimalNumber(target) / 1e2;
  return {
    pct,
    currYear,
    baseYear: baseYear || currYear - 1,
    label: getTargetLabel(target, baseYear, isHistory, lng),
  };
}
