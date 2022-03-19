import AnalysisSkeleton from '../components/skeleton/AnalysisSkeleton';
import GoalSkeleton from '../components/skeleton/GoalSkeleton';
import HomeSkeleton from '../components/skeleton/HomeSkeleton';
import ManagementSkeleton from '../components/skeleton/ManagementSkeleton';

import { lazyPreload } from './helpers';

export const publicRoutes = [
  {
    path: '/login',
    title: '登入',
    element: lazyPreload(() => import('../pages/login/LoginPage')),
    i18nKey: 'login',
  },
  {
    path: '/unauthorized',
    title: '',
    element: lazyPreload(() => import('../pages/unauthorized/UnauthorizedPage')),
    i18nKey: 'unauthorized',
  },
  {
    path: '*',
    title: '',
    element: lazyPreload(() => import('../pages/not-found/NotFoundPage')),
    i18nKey: 'not-found',
  },
];

export const managementRoutes = [
  {
    index: true,
    indexPath: '/management',
    path: 'goal',
    element: lazyPreload(() => import('../pages/management/GoalPage')),
    i18nKey: 'goal',
    skeleton: GoalSkeleton,
  },
  {
    path: 'data-status',
    element: lazyPreload(() => import('../pages/management/DataStatusPage')),
    i18nKey: 'dataStatus',
    skeleton: ManagementSkeleton,
  },
  {
    path: 'csr',
    element: lazyPreload(() => import('../pages/management/CsrPage')),
    i18nKey: 'csrAndFemStatus',
    skeleton: ManagementSkeleton,
  },
  {
    path: 'pic',
    element: lazyPreload(() => import('../pages/management/PicPage')),
    i18nKey: 'pic',
    skeleton: ManagementSkeleton,
  },
  {
    path: 'version',
    element: lazyPreload(() => import('../pages/management/VersionPage')),
    i18nKey: 'changelog',
    skeleton: ManagementSkeleton,
  },
];

export const privateRoutes = [
  {
    index: true,
    indexPath: '/',
    path: '/home',
    title: '首頁',
    element: lazyPreload(() => import('../pages/home/HomePage')),
    skeleton: HomeSkeleton,
    i18nKey: 'home',
  },
  {
    path: '/overview',
    title: '總覽比較',
    element: lazyPreload(() => import('../pages/overview/OverviewPage')),
    i18nKey: 'overview',
  },
  {
    path: '/carbon',
    title: '碳排放量',
    element: lazyPreload(() => import('../pages/carbon/CarbonPage')),
    i18nKey: 'carbon',
  },
  {
    path: '/renewable-energy',
    title: '可再生能源',
    element: lazyPreload(() => import('../pages/renewable-energy/RenewableEnergyPage')),
    i18nKey: 'renewableEnergy',
  },
  {
    path: '/electricity',
    title: '用電',
    element: lazyPreload(() => import('../pages/electricity/ElectricityPage')),
    i18nKey: 'electricity',
    group: '/electricity',
  },
  {
    path: '/analysis/electricity',
    title: '用電分析',
    element: lazyPreload(() => import('../pages/electricity/ElectricityBaselinePage')),
    i18nKey: 'electricityBaseline',
  },
  {
    path: '/water',
    title: '用水',
    element: lazyPreload(() => import('../pages/water/WaterPage')),
    i18nKey: 'water',
    group: '/water',
  },
  {
    path: '/unit-electricity',
    title: '約當單台用電',
    element: lazyPreload(() => import('../pages/unit-electricity/UnitElectricityPage')),
    i18nKey: 'unitElectricity',
  },
  {
    path: '/waste',
    title: '廢棄物',
    element: lazyPreload(() => import('../pages/waste/WastePage')),
    i18nKey: 'waste',
    group: '/waste',
  },
  {
    path: '/management',
    title: '後台設定',
    element: lazyPreload(() => import('../pages/management/ManagementPage')),
    skeleton: GoalSkeleton,
    i18nKey: 'management',
    group: '/management',
    routes: managementRoutes,
  },
  {
    path: '/electricity/analysis',
    title: '用電第三階段分析',
    element: lazyPreload(() => import('../pages/electricity/ElectricityAnalysisPage')),
    skeleton: AnalysisSkeleton,
    show: false,
    i18nKey: 'electricityAnalysis',
    group: '/electricity',
  },
  {
    path: '/water/analysis',
    title: '用水第三階段分析',
    element: lazyPreload(() => import('../pages/water/WaterAnalysisPage')),
    skeleton: AnalysisSkeleton,
    show: false,
    i18nKey: 'waterAnalysis',
    group: '/water',
  },
  {
    path: '/waste/analysis',
    title: '廢棄物第三階段分析',
    element: lazyPreload(() => import('../pages/waste/WasteAnalysisPage')),
    skeleton: AnalysisSkeleton,
    show: false,
    i18nKey: 'wasteAnalysis',
    group: '/waste',
  },
];

const routes = [...publicRoutes, ...privateRoutes];

export default routes;
