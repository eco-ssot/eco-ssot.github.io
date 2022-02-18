import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as PdfIcon } from '../../../public/icons/file-pdf-solid.svg';
import version from '../../../version.json';
import APP_CONFIG from '../../constants/app-config';
import { useKeycloak } from '../../keycloak';
import { selectBusiness, selectLanguage } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import Avatar from '../avatar/Avatar';
import Divider from '../divider/Divider';
import NavBar from '../nav-bar/NavBar';
import GhostSelect from '../select/GhostSelect';

export default function Header({ className }) {
  const { t } = useTranslation(['common']);
  const lng = useSelector(selectLanguage);
  const business = useSelector(selectBusiness);
  const { keycloak } = useKeycloak();
  return (
    <div className={clsx('flex px-4 bg-primary-800 shadow-lg items-center z-10', className)}>
      <Link className="flex items-center space-x-4" to="/">
        <img className="h-10 w-10" src="/logo-64x64.png" alt="logo" />
        <div className="block truncate font-medium text-xl">{t('title')}</div>
        <div className="block truncate text-unit text-sm">
          Ver {Object.keys(version).sort((a, b) => b.localeCompare(a))[0]}
        </div>
      </Link>
      <Divider className="h-1/2" />
      {keycloak?.authenticated ? (
        <>
          <GhostSelect
            className="w-32"
            options={APP_CONFIG.BUSINESS_OPTIONS}
            onChange={navigate}
            selected={APP_CONFIG.BUSINESS_OPTIONS.find((option) => option.key === business)}
            queryKey="business"
          />
          <Divider className="h-1/2" />
          <NavBar />
          <Divider className="h-1/2" />
          <a href="/ECO系統說明手冊_1.0.3.pdf" target="_blank">
            <PdfIcon className="w-5 h-5 fill-gray-50" />
          </a>
          <Divider className="h-1/2" />
        </>
      ) : (
        <div className="flex-grow"></div>
      )}
      <GhostSelect
        className="w-32"
        options={APP_CONFIG.LANGUAGE_OPTIONS}
        selected={APP_CONFIG.LANGUAGE_OPTIONS.find((option) => lng?.startsWith(option.key))}
        onChange={navigate}
        queryKey="lng"
      />
      <Divider className="h-1/2" />
      {keycloak?.authenticated ? <Avatar>{keycloak?.idTokenParsed?.given_name}</Avatar> : <div>Login</div>}
    </div>
  );
}
