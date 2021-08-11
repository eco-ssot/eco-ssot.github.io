import clsx from 'clsx';

import NavBar from '../nav-bar/NavBar';
import Divider from '../divider/Divider';
import Select from '../select/Select';
import TimeInfo from '../time-info/TimeInfo';
import WeatherInfo from '../weather-info/WeatherInfo';
import Avatar from '../avatar/Avatar';

export default function Header({ className }) {
  return (
    <div className={clsx('flex px-4 bg-header shadow-lg items-center z-10', className)}>
      <div className="font-medium text-2xl block truncate">ESG 績效管理平台</div>
      <Divider className="h-1/2" />
      <Select
        className="w-28"
        options={[
          { key: 'WT', value: 'WT' },
          { key: 'WSD', value: 'WSD' },
          { key: 'ALL', value: 'ALL' },
        ]}
      />
      <Divider className="h-1/2" />
      <NavBar />
      <Divider className="h-1/2" />
      <div className="flex space-x-4 items-center">
        <TimeInfo className="block truncate" />
        <WeatherInfo />
      </div>
      <Divider className="h-1/2" />
      <Avatar className="block truncate">Dawin Zhu</Avatar>
    </div>
  );
}
