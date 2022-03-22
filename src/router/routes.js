import AnalysisSkeleton from '../components/skeleton/AnalysisSkeleton';
import GoalSkeleton from '../components/skeleton/GoalSkeleton';
import HomeSkeleton from '../components/skeleton/HomeSkeleton';
import ManagementSkeleton from '../components/skeleton/ManagementSkeleton';

import { lazyPreload } from './helpers';

export const publicRoutes = [
  {
    path: '/login',
    element: lazyPreload(() => import('../pages/login/LoginPage')),
    i18nKey: 'login',
  },
  {
    path: '/unauthorized',
    element: lazyPreload(() => import('../pages/unauthorized/UnauthorizedPage')),
    i18nKey: 'unauthorized',
  },
  {
    path: '*',
    element: lazyPreload(() => import('../pages/not-found/NotFoundPage')),
    i18nKey: 'notFound',
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
    element: lazyPreload(() => import('../pages/home/HomePage')),
    skeleton: HomeSkeleton,
    i18nKey: 'home',
  },
  {
    path: '/overview',
    element: lazyPreload(() => import('../pages/overview/OverviewPage')),
    i18nKey: 'overview',
  },
  {
    path: '/carbon',
    element: lazyPreload(() => import('../pages/carbon/CarbonPage')),
    i18nKey: 'carbon',
  },
  {
    path: '/renewable-energy',
    element: lazyPreload(() => import('../pages/renewable-energy/RenewableEnergyPage')),
    i18nKey: 'renewableEnergy',
  },
  {
    path: '/electricity',
    i18nKey: 'electricity',
    routes: [
      {
        index: true,
        element: lazyPreload(() => import('../pages/electricity/ElectricityPage')),
      },
      {
        path: 'analysis',
        element: lazyPreload(() => import('../pages/electricity/ElectricityAnalysisPage')),
        skeleton: AnalysisSkeleton,
      },
    ],
  },
  {
    path: '/analysis/electricity',
    element: lazyPreload(() => import('../pages/electricity/ElectricityBaselinePage')),
    i18nKey: 'electricityBaseline',
  },
  {
    path: '/water',
    i18nKey: 'water',
    routes: [
      {
        index: true,
        element: lazyPreload(() => import('../pages/water/WaterPage')),
      },
      {
        path: 'analysis',
        element: lazyPreload(() => import('../pages/water/WaterAnalysisPage')),
        skeleton: AnalysisSkeleton,
      },
    ],
  },
  {
    path: '/unit-electricity',
    title: '約當單台用電',
    element: lazyPreload(() => import('../pages/unit-electricity/UnitElectricityPage')),
    i18nKey: 'unitElectricity',
  },
  {
    path: '/waste',
    i18nKey: 'waste',
    routes: [
      {
        index: true,
        element: lazyPreload(() => import('../pages/waste/WastePage')),
      },
      {
        path: 'analysis',
        element: lazyPreload(() => import('../pages/waste/WasteAnalysisPage')),
        skeleton: AnalysisSkeleton,
      },
    ],
  },
  {
    path: '/management',
    element: lazyPreload(() => import('../pages/management/ManagementPage')),
    skeleton: GoalSkeleton,
    i18nKey: 'management',
    routes: managementRoutes,
  },
];

const routes = [...publicRoutes, ...privateRoutes];

export default routes;
