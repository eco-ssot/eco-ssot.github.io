import axios from 'axios';

import { AsyncSearchSelect } from './SearchSelect';

const { REACT_APP_GRAPH_API_BASE_URL, REACT_APP_GRAPH_API_CODE } = process.env;

const loadOptions = (q, callback) => {
  return axios
    .get(`${REACT_APP_GRAPH_API_BASE_URL}?code=${REACT_APP_GRAPH_API_CODE}${q ? `&q=${q}` : ''}`)
    .then((res) => {
      const options = res.data.map(({ id, mail }) => ({
        value: id,
        label: (mail || '').toLowerCase(),
      }));

      callback(options);
    })
    .catch((err) => console.log({ err }));
};

export default function AdSearchSelect({ options = [], ...props }) {
  return <AsyncSearchSelect defaultOptions={options} loadOptions={loadOptions} {...props} />;
}
