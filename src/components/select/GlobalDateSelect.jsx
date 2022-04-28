import { useEffect, useMemo } from 'react';

import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import { selectCurrMonth, selectYoptions } from '../../app/appSlice';
import { selectM, selectY } from '../../renderless/location/locationSlice';
import useNavigate from '../../router/useNavigate';
import { useGetLatestDateQuery } from '../../services/app';

import TagSelect from './TagSelect';

export default function GlobalDateSelect() {
  const y = useSelector(selectY);
  const m = useSelector(selectM);
  const currMonth = useSelector(selectCurrMonth);
  const yearOptions = useSelector(selectYoptions);
  const { data: { latestDate } = {} } = useGetLatestDateQuery();
  const yOptions = useMemo(() => yearOptions.filter((option) => Number(option.key) > 2020), [yearOptions]);
  const mOptions = useMemo(
    () =>
      (latestDate
        ? APP_CONSTANTS.MONTH_OPTIONS.filter((option) => {
            const ld = new Date(latestDate);
            const currY = ld.getFullYear();
            const currM = ld.getMonth() + 1;
            return Number(y || yOptions?.[0]?.key) < currY ? true : Number(option.key) < currM + 1;
          })
        : APP_CONSTANTS.MONTH_OPTIONS
      ).map((option) => ({ ...option, value: option.value.padStart(2, 0) })),
    [latestDate, y, yOptions]
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (m && !mOptions.find((option) => Number(option.key) === Number(m))) {
      navigate({ m: mOptions.slice(-1)?.[0]?.key });
    }
  }, [y, m, mOptions, navigate]);
  return (
    <div className="flex items-center">
      <TagSelect
        options={yOptions}
        selected={yOptions?.find((option) => option.key === y)}
        onChange={(e) => navigate({ ...e, cy: Number(e.y) - 1 })}
        queryKey="y"
      />
      01 -
      <TagSelect
        className="w-16"
        options={mOptions}
        selected={mOptions.find((option) => option.key === m) || mOptions.find((option) => option.key === currMonth)}
        onChange={navigate}
        queryKey="m"
      />
    </div>
  );
}
