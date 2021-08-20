import { lazy } from 'react';

import LoginPage from '../pages/login/LoginPage';
import HomeSkeleton from '../components/skeleton/HomeSkeleton';
import ManagementSkeleton from '../components/skeleton/ManagementSkeleton';

export function lazyPreload(factory) {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
}

export const publicRoutes = [
  {
    path: '/login',
    title: '登入',
    component: LoginPage,
  },
];

export const privateRoutes = [
  {
    path: '/home',
    title: '首頁',
    component: lazyPreload(() => import('../pages/home/HomePage')),
    skeleton: HomeSkeleton,
  },
  {
    path: '/overview',
    title: '總覽比較',
    component: lazyPreload(() => import('../pages/overview/OverviewPage')),
  },
  {
    path: '/carbon',
    title: '碳排放量',
    component: lazyPreload(() => import('../pages/carbon/CarbonPage')),
  },
  {
    path: '/renewable-energy',
    title: '可再生能源',
    component: lazyPreload(() => import('../pages/renewable-energy/RenewableEnergyPage')),
  },
  {
    path: '/electricity',
    title: '用電',
    component: lazyPreload(() => import('../pages/electricity/ElectricityPage')),
  },
  {
    path: '/water',
    title: '用水',
    component: lazyPreload(() => import('../pages/water/WaterPage')),
  },
  {
    path: '/unit-electricity',
    title: '單台用電',
    component: lazyPreload(() => import('../pages/unit-electricity/UnitElectricityPage')),
  },
  {
    path: '/waste',
    title: '廢棄物',
    component: lazyPreload(() => import('../pages/waste/WastePage')),
  },
  {
    path: '/management',
    title: '後台維護',
    component: lazyPreload(() => import('../pages/management/ManagementPage')),
    skeleton: ManagementSkeleton,
  },
];

const routes = [...publicRoutes, ...privateRoutes];

export default routes;
