import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useKeycloak } from '../../keycloak';
import NavBar from '../nav-bar/NavBar';
import Divider from '../divider/Divider';
import GhostSelect from '../select/GhostSelect';
import TimeInfo from '../time-info/TimeInfo';
import WeatherInfo from '../weather-info/WeatherInfo';
import Avatar from '../avatar/Avatar';
import { navigate } from '../../router/helpers';
import { selectBusiness } from '../../renderless/location/locationSlice';
import APP_CONFIG from '../../constants/app-config';
import packageJson from '../../../package.json';

export default function Header({ className }) {
  const business = useSelector(selectBusiness);
  const { keycloak } = useKeycloak();
  return (
    <div className={clsx('flex px-4 bg-primary-800 shadow-lg items-center z-10', className)}>
      <Link className="flex items-center space-x-4" to="/">
        <img className="h-10 w-10" src="/logo-64x64.png" alt="logo" />
        <div className="block truncate font-medium text-xl">ESG 績效管理平台</div>
        <div className="block truncate text-unit text-sm">Ver {packageJson.version}</div>
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
        </>
      ) : (
        <div className="flex-grow"></div>
      )}
      <div className="flex space-x-4 items-center">
        <TimeInfo />
        <WeatherInfo />
      </div>
      <Divider className="h-1/2" />
      {keycloak?.authenticated ? <Avatar>{keycloak?.idTokenParsed?.given_name}</Avatar> : <div>Login</div>}
    </div>
  );
}
