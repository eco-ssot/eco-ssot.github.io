import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';

import { setError } from './errorHandlerSlice';

import axios from '../../axios';

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
