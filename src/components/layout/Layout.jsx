import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { Select } from 'antd';

import NavBar from '../nav-bar/NavBar';
import Divider from '../divider/Divider';

const { Option } = Select;

export default function Layout({ children, match, ...props }) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="flex h-16 px-4 bg-header shadow-lg items-center z-10" {...props}>
        <div className="font-medium text-2xl">ESG 績效管理平台</div>
        <Divider />
        <Select className="text-lg w-24" defaultValue="WT">
          <Option value="WT">WT</Option>
          <Option value="WSD">WSD</Option>
        </Select>
        <Divider />
        <NavBar className="w-1/2" match={match} />
        <Divider />
        <div>{format(date, 'yyyy年 MM月 dd日 HH:mm')}</div>
      </div>
      {children}
    </>
  );
}
