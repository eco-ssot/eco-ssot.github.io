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
        toast.error(error.response?.data?.message || error.message);
        return Promise.reject(error);
      }
    );
  });

  return null;
}
