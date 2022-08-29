import { useMemo } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import useAuth from '../../hooks/useAuth';
import useSitePlantOptions from '../../hooks/useSitePlantOptions';
import { selectBusiness, selectLanguage, selectP, selectS } from '../../renderless/location/locationSlice';
import useNavigate from '../../router/useNavigate';
import { useGetVersionQuery } from '../../services/management';
import Divider from '../divider/Divider';
import Ellipsis from '../ellipsis/Ellipsis';
import Manual from '../manual/Manual';
import NavBar from '../nav-bar/NavBar';
import Picture from '../picture/Picture';
import GhostSelect from '../select/GhostSelect';
import GroupSelect from '../select/GroupSelect';

const GLOBAL_SELECT_DISABLED_PATH_NAMES = ['/electricity/analysis', '/water/analysis', '/waste/analysis'];

export default function Header({ className }) {
  const { t } = useTranslation(['common']);
  const { pathname } = useLocation();
  const { authenticated, accounts } = useAuth();
  const lng = useSelector(selectLanguage);
  const business = useSelector(selectBusiness);
  const site = useSelector(selectS);
  const plant = useSelector(selectP);
  const sitePlantOptions = useSitePlantOptions();
  const { data: version } = useGetVersionQuery();
  const businessOptions = useMemo(
    () =>
      APP_CONSTANTS.BUSINESS_OPTIONS.map((option) => ({
        ...option,
        ...(option.i18nKey && { value: t(option.i18nKey) }),
      })),
    [t]
  );

  const navigate = useNavigate();
  return (
    <div className={clsx('z-10 flex items-center bg-primary-800 px-4 shadow-lg', className)}>
      <Link className="flex items-center space-x-4" to="/">
        <Picture className="h-10 w-10" src="/logo-64x64.webp" fallback="/logo-64x64.png" alt="logo" />
        <Ellipsis label={t('title')} className="text-xl font-medium" />
        {version && (
          <Ellipsis
            label={`Ver ${Object.keys(version).sort((a, b) => b.localeCompare(a))[0]}`}
            className="text-sm text-unit"
          />
        )}
      </Link>
      <Divider className="h-1/2" />
      {authenticated ? (
        <>
          <GhostSelect
            disabled={GLOBAL_SELECT_DISABLED_PATH_NAMES.includes(pathname)}
            className="w-28"
            options={businessOptions}
            onChange={(e) => navigate({ ...e, s: null, p: null })}
            selected={businessOptions.find((option) => option.key === business)}
            queryKey="business"
            ariaLabel="business"
          />
          <Divider className="h-1/2" />
          <GroupSelect
            disabled={GLOBAL_SELECT_DISABLED_PATH_NAMES.includes(pathname)}
            buttonClassName="w-42"
            options={sitePlantOptions}
            onChange={navigate}
            selected={
              sitePlantOptions.find((option) => option.key === plant) ||
              sitePlantOptions.find((option) => option.key === site)
            }
            parentKey="s"
            childKey="p"
            ariaLabel="site-plant"
          />
          <Divider className="h-1/2" />
          <NavBar />
          <Divider className="h-1/2" />
          <Manual lng={lng} />
          <Divider className="h-1/2" />
        </>
      ) : (
        <>
          <div className="flex-grow"></div>
          <Divider className="h-1/2" />
        </>
      )}
      <GhostSelect
        className="w-30"
        options={APP_CONSTANTS.LANGUAGE_OPTIONS}
        selected={APP_CONSTANTS.LANGUAGE_OPTIONS.find((option) => lng?.startsWith(option.key))}
        onChange={navigate}
        queryKey="lng"
      />
      <Divider className="h-1/2" />
      {authenticated ? (
        <Ellipsis label={accounts[0]?.name?.split('/')?.[0]} placement="left" />
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
