import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NavBar from '../nav-bar/NavBar';
import Divider from '../divider/Divider';
import Select from '../select/Select';
import TimeInfo from '../time-info/TimeInfo';
import WeatherInfo from '../weather-info/WeatherInfo';
import Avatar from '../avatar/Avatar';
import { navigate } from '../../router/helpers';
import { selectBusiness } from '../../renderless/query-params/queryParamsSlice';

const BUSINESS_OPTIONS = [
  { key: 'WT', value: 'WT' },
  { key: 'WSD', value: 'WSD' },
  { key: 'ALL', value: 'ALL' },
];

export default function Header({ className }) {
  const business = useSelector(selectBusiness);
  return (
    <div className={clsx('flex px-4 bg-primary-800 shadow-lg items-center z-10', className)}>
      <Link className="flex items-center font-medium text-2xl space-x-4" to="/">
        <img className="h-10 w-10" src="/logo-64x64.png" alt="logo" />
        <div className="block truncate">ESG 績效管理平台</div>
      </Link>
      <Divider className="h-1/2" />
      <Select
        className="w-28"
        options={BUSINESS_OPTIONS}
        onChange={navigate}
        selected={BUSINESS_OPTIONS.find((option) => option.key === business) || BUSINESS_OPTIONS[0]}
        queryKey="business"
      />
      <Divider className="h-1/2" />
      <NavBar />
      <Divider className="h-1/2" />
      <div className="flex space-x-4 items-center">
        <TimeInfo />
        <WeatherInfo />
      </div>
      <Divider className="h-1/2" />
      <Avatar>Dawin Zhu</Avatar>
    </div>
  );
}
