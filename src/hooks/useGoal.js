import { useGetGoalQuery } from '../services/management';
import { getTargetLabel } from '../utils/label';
import { getDecimalNumber } from '../utils/number';

export default function useGoal({ keyword, isHistory = false } = {}) {
  const currYear = new Date().getFullYear();
  const { data: { data = [] } = {} } = useGetGoalQuery({ year: currYear });
  const { baseYear, target = '' } = data.filter((d) => new RegExp(keyword).test(d.category))[0] || {};
  const pct = Number(getDecimalNumber(target) / 1e2) * (isHistory ? 1 : baseYear ? currYear - baseYear : 1);
  return {
    pct,
    currYear,
    baseYear: baseYear || currYear - 1,
    label: getTargetLabel(target, baseYear, isHistory),
  };
}
