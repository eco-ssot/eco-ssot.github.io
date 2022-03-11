import AnalysisSkeleton from '../components/skeleton/AnalysisSkeleton';
import HomeSkeleton from '../components/skeleton/HomeSkeleton';
import ManagementSkeleton from '../components/skeleton/ManagementSkeleton';

import { lazyPreload } from './helpers';

export const publicRoutes = [
  {
    path: '/login',
    title: '登入',
    component: lazyPreload(() => import('../pages/login/LoginPage')),
    key: 'login',
  },
  {
    path: '/unauthorized',
    title: '',
    component: lazyPreload(() => import('../pages/unauthorized/UnauthorizedPage')),
    key: 'unauthorized',
  },
];

export const privateRoutes = [
  {
    path: '/home',
    title: '首頁',
    component: lazyPreload(() => import('../pages/home/HomePage')),
    skeleton: HomeSkeleton,
    key: 'home',
  },
  {
    path: '/overview',
    title: '總覽比較',
    component: lazyPreload(() => import('../pages/overview/OverviewPage')),
    key: 'overview',
  },
  {
    path: '/carbon',
    title: '碳排放量',
    component: lazyPreload(() => import('../pages/carbon/CarbonPage')),
    key: 'carbon',
  },
  {
    path: '/renewable-energy',
    title: '可再生能源',
    component: lazyPreload(() => import('../pages/renewable-energy/RenewableEnergyPage')),
    key: 'renewableEnergy',
  },
  {
    path: '/electricity',
    title: '用電',
    component: lazyPreload(() => import('../pages/electricity/ElectricityPage')),
    key: 'electricity',
    group: '/electricity',
  },
  {
    path: '/analysis/electricity',
    title: '用電分析',
    component: lazyPreload(() => import('../pages/electricity/ElectricityBaselinePage')),
    key: 'electricityBaseline',
  },
  {
    path: '/water',
    title: '用水',
    component: lazyPreload(() => import('../pages/water/WaterPage')),
    key: 'water',
    group: '/water',
  },
  {
    path: '/unit-electricity',
    title: '約當單台用電',
    component: lazyPreload(() => import('../pages/unit-electricity/UnitElectricityPage')),
    key: 'unitElectricity',
  },
  {
    path: '/waste',
    title: '廢棄物',
    component: lazyPreload(() => import('../pages/waste/WastePage')),
    key: 'waste',
    group: '/waste',
  },
  {
    path: '/management',
    title: '後台設定',
    component: lazyPreload(() => import('../pages/management/ManagementPage')),
    skeleton: ManagementSkeleton,
    exact: false,
    key: 'management',
    group: '/management',
  },
  {
    path: '/electricity/analysis',
    title: '用電第三階段分析',
    component: lazyPreload(() => import('../pages/electricity/ElectricityAnalysisPage')),
    skeleton: AnalysisSkeleton,
    show: false,
    key: 'electricityAnalysis',
    group: '/electricity',
  },
  {
    path: '/water/analysis',
    title: '用水第三階段分析',
    component: lazyPreload(() => import('../pages/water/WaterAnalysisPage')),
    skeleton: AnalysisSkeleton,
    show: false,
    key: 'waterAnalysis',
    group: '/water',
  },
  {
    path: '/waste/analysis',
    title: '廢棄物第三階段分析',
    component: lazyPreload(() => import('../pages/waste/WasteAnalysisPage')),
    skeleton: AnalysisSkeleton,
    show: false,
    key: 'wasteAnalysis',
    group: '/waste',
  },
];

const routes = [...publicRoutes, ...privateRoutes];

export default routes;
