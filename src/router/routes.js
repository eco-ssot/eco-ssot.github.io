import { lazy } from 'react';

import LoginPage from '../pages/login/LoginPage';
import HomeSkeleton from '../components/skeleton/HomeSkeleton';
import ManagementSkeleton from '../components/skeleton/ManagementSkeleton';
import AnalysisSkeleton from '../components/skeleton/AnalysisSkeleton';
import UnauthorizedPage from '../pages/unauthorized/UnauthorizedPage';
import ErrorPage from '../pages/error/ErrorPage';

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
  {
    path: '/unauthorized',
    title: '',
    component: UnauthorizedPage,
  },
  {
    path: '/error',
    title: '',
    component: ErrorPage,
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

export const subRoutes = [
  {
    path: '/electricity/analysis',
    title: '用電第三階段分析',
    component: lazyPreload(() => import('../pages/electricity/ElectricityAnalysisPage')),
    skeleton: AnalysisSkeleton,
    show: false,
  },
  {
    path: '/water/analysis',
    title: '用水第三階段分析',
    component: lazyPreload(() => import('../pages/water/WaterAnalysisPage')),
    skeleton: AnalysisSkeleton,
    show: false,
  },
  {
    path: '/waste/analysis',
    title: '廢棄物第三階段分析',
    component: lazyPreload(() => import('../pages/waste/WasteAnalysisPage')),
    skeleton: AnalysisSkeleton,
    show: false,
  },
];

const routes = [...publicRoutes, ...privateRoutes, ...subRoutes];

export default routes;
