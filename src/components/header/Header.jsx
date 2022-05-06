import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'react-use';

import APP_CONSTANTS from '../../app/appConstants';
import useSitePlantOptions from '../../hooks/useSitePlantOptions';
import { useKeycloak } from '../../keycloak';
import { selectBusiness, selectLanguage, selectP, selectS } from '../../renderless/location/locationSlice';
import useNavigate from '../../router/useNavigate';
import { useGetVersionQuery } from '../../services/public';
import Divider from '../divider/Divider';
import Ellipsis from '../ellipsis/Ellipsis';
import Manual from '../manual/Manual';
import NavBar from '../nav-bar/NavBar';
import Picture from '../picture/Picture';
import GhostSelect from '../select/GhostSelect';
import GroupSelect from '../select/GroupSelect';

export default function Header({ className }) {
  const ref = useRef();
  const checkTruncatedRef = useRef(true);
  const { width } = useWindowSize();
  const { t } = useTranslation(['common']);
  const { keycloak } = useKeycloak();
  const lng = useSelector(selectLanguage);
  const business = useSelector(selectBusiness);
  const site = useSelector(selectS);
  const plant = useSelector(selectP);
  const sitePlantOptions = useSitePlantOptions();
  const { data: version } = useGetVersionQuery();
  const [isTruncated, setIsTruncated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    ref.current && setIsTruncated(ref.current.offsetWidth < ref.current.scrollWidth);
    checkTruncatedRef.current = true;
  }, [width]);

  return (
    <div
      className={clsx('z-10 flex items-center bg-primary-800 px-4 shadow-lg', className)}
      ref={(node) => {
        ref.current = node;
        if (node) {
          const truncated = node.offsetWidth < node.scrollWidth;
          if (checkTruncatedRef.current) {
            setIsTruncated(truncated);
          }

          if (truncated) {
            checkTruncatedRef.current = false;
          }
        }
      }}>
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
      {keycloak?.authenticated ? (
        <>
          <GhostSelect
            className="w-28"
            options={APP_CONSTANTS.BUSINESS_OPTIONS}
            onChange={(e) => navigate({ ...e, s: null, p: null })}
            selected={APP_CONSTANTS.BUSINESS_OPTIONS.find((option) => option.key === business)}
            queryKey="business"
            ariaLabel="business"
          />
          <Divider className="h-1/2" />
          <GroupSelect
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
          <NavBar isTruncated={isTruncated} />
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
      {keycloak?.authenticated ? (
        <Ellipsis label={keycloak?.idTokenParsed?.given_name} placement="left" />
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
