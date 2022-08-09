import axios from 'axios';

import { AsyncSearchSelect } from './SearchSelect';

const loadOptions = (q, callback) => {
  return axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/graph${q ? `?q=${q}` : ''}`)
    .then((res) => {
      const options = res.data.map((d) => ({
        ...d,
        value: d.id,
        label: (d.mail || '').toLowerCase(),
        alias: String(d.displayName).split('/')[0],
      }));

      callback(options);
    })
    .catch((err) => console.error({ err }));
};

export default function AdSearchSelect({ options = [], ...props }) {
  return <AsyncSearchSelect defaultOptions={options} loadOptions={loadOptions} {...props} />;
}
