import { useMemo } from 'react';

import { groupBy } from 'lodash';

import usePlantPermission from './usePlantPermission';

export default function useSitePlantOptions() {
  const data = usePlantPermission();
  const sitePlantOptions = useMemo(() => {
    const grouped = groupBy(data, (key) => key.split(/-|_/)[0]);
    return Object.entries(grouped).reduce(
      (prev, [site, values]) => {
        const siteOption = { key: site, value: site, group: true };
        if (values.length === 1) {
          if (values[0] === site) {
            return prev.concat(siteOption);
          }

          return prev.concat(siteOption, { key: values[0], value: values[0], parent: site });
        }

        return prev.concat([siteOption, ...values.map((value) => ({ value, key: value, parent: site }))]);
      },
      [{ key: 'ALL', value: 'ALL', alias: 'Sites / Plants', group: true }]
    );
  }, [data]);

  return sitePlantOptions;
}
