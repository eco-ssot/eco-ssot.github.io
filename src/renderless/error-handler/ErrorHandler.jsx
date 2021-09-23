import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';

import axios from '../../axios';

import { setError } from './errorHandlerSlice';

export default function ErrorHandler() {
  useMount(() => {
    axios.interceptors.response.use(
      (response) => {
        dispatch(setError());
        return response;
      },
      (error) => {
        dispatch(setError(error.response?.data?.message || error.message));
        return Promise.reject(error);
      }
    );
  });

  const dispatch = useDispatch();
  return null;
}
