import toast from 'react-hot-toast';
import { useMount } from 'react-use';

import axios from '../../axios';

export default function ErrorHandler() {
  useMount(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const msg = error.response?.data?.message || error.response?.data?.msg || error.message;
        toast.error(msg, { id: msg });
        return Promise.reject(error);
      }
    );
  });

  return null;
}
