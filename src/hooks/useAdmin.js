import { useMemo } from 'react';

import APP_CONSTANTS from '../app/appConstants';

import useAuth from './useAuth';

export default function useAdmin() {
  const { user } = useAuth();
  const canEdit = useMemo(() => user?.roles?.includes(APP_CONSTANTS.MAINTAINER_ROLE), [user?.roles]);
  return { canEdit };
}
