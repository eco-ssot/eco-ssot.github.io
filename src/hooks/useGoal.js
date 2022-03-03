import { useSelector } from 'react-redux';

import { selectCurrY } from '../app/appSlice';
import { selectBusiness, selectLanguage } from '../renderless/location/locationSlice';
import { useGetGoalQuery } from '../services/management';
import { getTargetLabel } from '../utils/label';
import { getDecimalNumber } from '../utils/number';

export default function useGoal({ keyword, isHistory = false, labelType = '' } = {}) {
  const business = useSelector(selectBusiness);
  const lng = useSelector(selectLanguage);
  const currYear = useSelector(selectCurrY);
  const { data: { data = [] } = {} } = useGetGoalQuery({ business, year: currYear }, { skip: !currYear });
  const { baseYear, target = '' } = data.filter((d) => new RegExp(keyword).test(d.category))[0] || {};
  const pct = getDecimalNumber(target) / 1e2;
  return {
    pct,
    currYear,
    baseYear: baseYear || currYear - 1,
    label: getTargetLabel(target, baseYear, isHistory, lng, labelType),
  };
}
