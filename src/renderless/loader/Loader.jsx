import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';

import { increment, decrement } from './loaderSlice';

import axios from '../../axios';

export default function Loader() {
  useMount(() => {
    axios.interceptors.request.use((config) => {
      dispatch(increment());
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        dispatch(decrement());
        return response;
      },
      (error) => {
        dispatch(decrement());
        return Promise.reject(error);
      }
    );
  });

  const dispatch = useDispatch();
  return null;
}
