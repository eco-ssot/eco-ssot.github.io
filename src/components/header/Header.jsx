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
import { selectBusiness } from '../../router/routerSlice';

const BUSINESS_OPTIONS = [
  { key: 'WT', value: 'WT' },
  { key: 'WSD', value: 'WSD' },
  { key: 'ALL', value: 'ALL' },
];

export default function Header({ className }) {
  const business = useSelector(selectBusiness);
  return (
    <div className={clsx('flex px-4 bg-primary-800 shadow-lg items-center z-10', className)}>
      <Link className="font-medium text-2xl block truncate" to="/">
        ESG 績效管理平台
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
