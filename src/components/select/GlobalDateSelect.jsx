import { useEffect, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import { selectM, selectPt, selectY } from '../../renderless/location/locationSlice';
import useNavigate from '../../router/useNavigate';
import { useGetLatestDateQuery } from '../../services/app';

import TagSelect from './TagSelect';

export default function GlobalDateSelect() {
  const { t } = useTranslation(['common']);
  const y = useSelector(selectY);
  const m = useSelector(selectM);
  const pt = useSelector(selectPt);
  const { data: { latestDate, currMonth, yearOptions } = {} } = useGetLatestDateQuery();
  const yOptions = useMemo(() => yearOptions?.filter((option) => Number(option.key) > 2020), [yearOptions]);
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

  const ptOptions = useMemo(
    () => [
      { key: APP_CONSTANTS.PERIOD_TYPES.YTM, value: t('common:accumulationRange') },
      { key: APP_CONSTANTS.PERIOD_TYPES.MONTH, value: t('common:singleMonth') },
    ],
    [t]
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
        options={ptOptions}
        selected={ptOptions?.find((option) => option.key === pt)}
        onChange={navigate}
        queryKey="pt"
      />
      :
      <TagSelect
        options={yOptions}
        selected={yOptions?.find((option) => option.key === y)}
        onChange={(e) => navigate({ ...e, cy: Number(e.y) - 1 })}
        queryKey="y"
      />
      {(!pt || pt === APP_CONSTANTS.PERIOD_TYPES.YTM) && '01 - '}
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
