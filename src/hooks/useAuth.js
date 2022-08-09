import { useMemo } from 'react';

import { useMsal } from '../ad';
import { useGetUserListQuery } from '../services/auth';

const USER_LIST = localStorage.getItem('user-list');

export default function useAuth() {
  const { accounts, inProgress, instance } = useMsal();
  const authenticated = useMemo(() => inProgress === 'none' && !!accounts[0], [inProgress, accounts]);
  const { isFetching, data = { data: USER_LIST ? JSON.parse(USER_LIST) : [] } } = useGetUserListQuery(undefined, {
    skip: !authenticated,
  });

  const authenticating = useMemo(() => inProgress !== 'none', [inProgress]);
  const user = useMemo(
    () => data?.data?.find((d) => accounts[0]?.username?.toLowerCase() === d.email?.toLowerCase()),
    [data?.data, accounts]
  );

  return { user, accounts, inProgress, instance, isFetching, authenticated, authenticating };
}
