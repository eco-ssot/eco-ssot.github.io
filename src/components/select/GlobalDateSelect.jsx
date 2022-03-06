import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import APP_CONSTANTS from '../../app/appConstants';
import { selectCurrMonth, selectYoptions } from '../../app/appSlice';
import { selectM, selectY } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';

import TagSelect from './TagSelect';

export default function GlobalDateSelect() {
  const y = useSelector(selectY);
  const m = useSelector(selectM);
  const currMonth = useSelector(selectCurrMonth);
  const yearOptions = useSelector(selectYoptions);
  const mOptions = useMemo(
    () => APP_CONSTANTS.MONTH_OPTIONS.map((option) => ({ ...option, value: option.value.padStart(2, 0) })),
    []
  );

  const yOptions = useMemo(() => yearOptions.filter((option) => Number(option.key) > 2020), [yearOptions]);
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
