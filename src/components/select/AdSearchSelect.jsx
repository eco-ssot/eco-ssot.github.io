import { debounce } from 'lodash';

import { useLazyGetUserQuery } from '../../services/graph';

import { AsyncSearchSelect } from './SearchSelect';

export default function AdSearchSelect({ options = [], ...props }) {
  const [trigger] = useLazyGetUserQuery();
  const loadOptions = debounce(
    (q, callback) => {
      trigger(q, true)
        .then((res) => {
          const options = res.data.value.map((d) => ({
            ...d,
            value: d.id,
            label: (d.mail || '').toLowerCase(),
            alias: String(d.displayName).split('/')[0],
          }));

          callback(options);
        })
        .catch((err) => console.error({ err }));
    },
    [500]
  );

  return <AsyncSearchSelect defaultOptions={options} loadOptions={loadOptions} {...props} />;
}
