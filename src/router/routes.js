import APP_CONSTANTS from '../app/appConstants';
import AirCompressorPageSkeleton from '../pages/air-compressor/AirCompressorPageSkeleton';
import AnalysisPageSkeleton from '../pages/analysis/AnalysisPageSkeleton';
import HomePageSkeleton from '../pages/home/HomePageSkeleton';
import GoalSkeleton from '../pages/management/GoalSkeleton';
import ManagementPageSkeleton from '../pages/management/ManagementPageSkeleton';
import ManagementSkeleton from '../pages/management/ManagementSkeleton';
import { appApi } from '../services/app';
import { authApi } from '../services/auth';
import { carbonApi } from '../services/carbon';
import { electricityApi } from '../services/electricity';
import { managementApi } from '../services/management';
import { overviewApi } from '../services/overview';
import { publicApi } from '../services/public';
import { renewableEnergyApi } from '../services/renewableEnergy';
import { summaryApi } from '../services/summary';
import { unitElectricityApi } from '../services/unitElectricity';
import { wasteApi } from '../services/waste';
import { waterApi } from '../services/water';

import { lazyPreload } from './helpers';

const TABLE_PAGE_QUERY_KEYS = [...APP_CONSTANTS.GLOBAL_QUERY_KEYS.filter((key) => key !== 'cy'), 'permission'];

export const publicRoutes = [
  // {
  //   path: '/login',
  //   element: lazyPreload(() => import('../pages/login/LoginPage'), {
  //     name: '/login/LoginPage',
  //   }),
  //   i18nKey: 'login',
  // },
  {
    path: '/unauthorized',
    element: lazyPreload(() => import('../pages/unauthorized/UnauthorizedPage'), {
      name: '/unauthorized/UnauthorizedPage',
    }),
    i18nKey: 'unauthorized',
  },
  {
    path: '*',
    element: lazyPreload(() => import('../pages/not-found/NotFoundPage'), { name: '/not-found/NotFoundPage' }),
    i18nKey: 'notFound',
  },
];

export const managementRoutes = [
  {
    index: true,
    path: 'goal',
    element: lazyPreload(() => import('../pages/management/GoalPage'), {
      name: '/management/GoalPage',
    }),
    i18nKey: 'goal',
    skeleton: GoalSkeleton,
    prefetchApis: [
      {
        api: managementApi,
        endpoints: [
          {
            name: 'getGoal',
            queryKeys: ['business', 'year', 's', 'p'],
          },
          {
            name: 'getCarbonIndex',
            queryKeys: ['year'],
          },
          {
            name: 'getTrec',
            queryKeys: ['year'],
          },
          {
            name: 'getTrecBySite',
            queryKeys: ['year', 'permission'],
          },
        ],
      },
    ],
  },
  {
    path: 'data-status',
    element: lazyPreload(() => import('../pages/management/DataStatusPage'), { name: '/management/DataStatusPage' }),
    i18nKey: 'dataStatus',
    skeleton: ManagementSkeleton,
  },
  {
    path: 'csr',
    element: lazyPreload(() => import('../pages/management/CsrPage'), {
      name: '/management/CsrPage',
    }),
    i18nKey: 'csrAndFemStatus',
    skeleton: ManagementSkeleton,
  },
  {
    path: 'pic',
    element: lazyPreload(() => import('../pages/management/PicPage'), {
      name: '/management/PicPage',
    }),
    i18nKey: 'pic',
    skeleton: ManagementSkeleton,
    prefetchApis: [
      {
        api: managementApi,
        endpoints: [
          {
            name: 'getDataStatusPic',
            queryKeys: ['permission'],
          },
        ],
      },
      {
        api: authApi,
        endpoints: [
          {
            name: 'getUserList',
          },
        ],
      },
    ],
  },
  {
    path: 'plant-changelog',
    element: lazyPreload(() => import('../pages/management/PlantChangelogPage'), {
      name: '/management/PlantChangelogPage',
    }),
    i18nKey: 'plantChangelog',
    skeleton: ManagementSkeleton,
    prefetchApis: [
      {
        api: publicApi,
        endpoints: [
          {
            name: 'getPlantChangelog',
          },
        ],
      },
    ],
  },
  {
    path: 'permission',
    element: lazyPreload(() => import('../pages/management/PermissionPage'), { name: '/management/PermissionPage' }),
    i18nKey: 'permission',
    skeleton: ManagementSkeleton,
  },
  {
    path: 'version',
    element: lazyPreload(() => import('../pages/management/VersionPage'), { name: '/management/VersionPage' }),
    i18nKey: 'changelog',
    skeleton: ManagementSkeleton,
    prefetchApis: [
      {
        api: managementApi,
        endpoints: [
          {
            name: 'getVersion',
          },
        ],
      },
    ],
  },
];

export const electricityAnalysisRoute = {
  path: '/electricity/analysis',
  i18nKey: 'electricity',
  element: lazyPreload(() => import('../pages/electricity/ElectricityAnalysisPage'), {
    name: '/electricity/ElectricityAnalysisPage',
  }),
  skeleton: AnalysisPageSkeleton,
  hidden: true,
};

export const waterAnalysisRoute = {
  path: '/water/analysis',
  i18nKey: 'water',
  element: lazyPreload(() => import('../pages/water/WaterAnalysisPage'), { name: '/water/WaterAnalysisPage' }),
  skeleton: AnalysisPageSkeleton,
  hidden: true,
};

export const wasteAnalysisRoute = {
  path: '/waste/analysis',
  i18nKey: 'waste',
  element: lazyPreload(() => import('../pages/waste/WasteAnalysisPage'), { name: '/waste/WasteAnalysisPage' }),
  skeleton: AnalysisPageSkeleton,
  hidden: true,
};

export const wasteRoute = {
  path: '/waste',
  i18nKey: 'waste',
  element: lazyPreload(() => import('../pages/waste/WastePage'), {
    name: '/waste/WastePage',
  }),
  prefetchApis: [
    {
      api: wasteApi,
      endpoints: [
        {
          name: 'getWaste',
          queryKeys: TABLE_PAGE_QUERY_KEYS,
        },
      ],
    },
  ],
};

export const wasteDetailRoute = {
  path: '/waste/detail',
  i18nKey: 'waste',
  element: lazyPreload(() => import('../pages/waste/WastePage'), {
    name: '/waste/WastePage',
  }),
  hidden: true,
  prefetchApis: [
    {
      api: wasteApi,
      endpoints: [
        {
          name: 'getWasteDetail',
          queryKeys: TABLE_PAGE_QUERY_KEYS,
        },
      ],
    },
  ],
};

export const privateRoutes = [
  {
    index: true,
    path: '/home',
    element: lazyPreload(() => import('../pages/home/HomePage'), {
      name: '/home/HomePage',
    }),
    skeleton: HomePageSkeleton,
    i18nKey: 'home',
    prefetchApis: [
      {
        api: summaryApi,
        endpoints: [
          {
            name: 'getSummary',
            queryKeys: APP_CONSTANTS.GLOBAL_QUERY_KEYS,
          },
        ],
      },
      {
        api: appApi,
        endpoints: [
          {
            name: 'getMissingPlants',
            queryKeys: APP_CONSTANTS.GLOBAL_QUERY_KEYS,
          },
        ],
      },
    ],
  },
  {
    path: '/overview',
    element: lazyPreload(() => import('../pages/overview/OverviewPage'), { name: '/overview/OverviewPage' }),
    i18nKey: 'overview',
    prefetchApis: [
      {
        api: overviewApi,
        endpoints: [
          {
            name: 'getOverview',
            queryKeys: TABLE_PAGE_QUERY_KEYS,
          },
        ],
      },
    ],
  },
  {
    path: '/carbon',
    element: lazyPreload(() => import('../pages/carbon/CarbonPage'), {
      name: '/carbon/CarbonPage',
    }),
    i18nKey: 'carbon',
    prefetchApis: [
      {
        api: carbonApi,
        endpoints: [
          {
            name: 'getCarbon',
            queryKeys: TABLE_PAGE_QUERY_KEYS,
          },
        ],
      },
    ],
  },
  {
    path: '/renewable-energy',
    element: lazyPreload(() => import('../pages/renewable-energy/RenewableEnergyPage'), {
      name: '/renewable-energy/RenewableEnergyPage',
    }),
    i18nKey: 'renewableEnergy',
    prefetchApis: [
      {
        api: renewableEnergyApi,
        endpoints: [
          {
            name: 'getRenewableEnergy',
            queryKeys: TABLE_PAGE_QUERY_KEYS,
          },
        ],
      },
    ],
  },
  {
    path: '/electricity',
    i18nKey: 'electricity',
    element: lazyPreload(() => import('../pages/electricity/ElectricityPage'), {
      name: '/electricity/ElectricityPage',
    }),
    prefetchApis: [
      {
        api: electricityApi,
        endpoints: [
          {
            name: 'getElectricity',
            queryKeys: TABLE_PAGE_QUERY_KEYS,
          },
        ],
      },
    ],
  },
  {
    path: '/analysis/electricity',
    element: lazyPreload(() => import('../pages/electricity/ElectricityBaselinePage'), {
      name: '/electricity/ElectricityBaselinePage',
    }),
    i18nKey: 'electricityBaseline',
  },
  {
    path: '/water',
    i18nKey: 'water',
    element: lazyPreload(() => import('../pages/water/WaterPage'), {
      name: '/water/WaterPage',
    }),
    prefetchApis: [
      {
        api: waterApi,
        endpoints: [
          {
            name: 'getWater',
            queryKeys: TABLE_PAGE_QUERY_KEYS,
          },
        ],
      },
    ],
  },
  {
    path: '/unit-electricity',
    title: '約當單台用電',
    element: lazyPreload(() => import('../pages/unit-electricity/UnitElectricityPage'), {
      name: '/unit-electricity/UnitElectricityPage',
    }),
    i18nKey: 'unitElectricity',
    prefetchApis: [
      {
        api: unitElectricityApi,
        endpoints: [
          {
            name: 'getUnitElectricity',
            queryKeys: TABLE_PAGE_QUERY_KEYS,
          },
        ],
      },
    ],
  },
  wasteRoute,
  {
    path: '/air-compressor',
    title: '空壓設備',
    element: lazyPreload(() => import('../pages/air-compressor/AirCompressorPage'), {
      name: '/air-compressor/AirCompressorPage',
    }),
    skeleton: AirCompressorPageSkeleton,
    i18nKey: 'airCompressor',
  },
  {
    path: '/decarbonization',
    title: '脫碳目標',
    element: lazyPreload(() => import('../pages/decarbonization/DecarbonizationPage'), {
      name: '/decarbonization/DecarbonizationPage',
    }),
    i18nKey: 'decarbonization',
  },
  {
    path: '/management',
    element: lazyPreload(() => import('../pages/management/ManagementPage'), {
      name: '/management/ManagementPage',
    }),
    skeleton: ManagementPageSkeleton,
    i18nKey: 'management',
    routes: managementRoutes,
    prefetchApis: [
      {
        api: managementApi,
        endpoints: [
          {
            name: 'getGoal',
            queryKeys: ['business', 'year', 's', 'p'],
          },
          {
            name: 'getCarbonIndex',
            queryKeys: ['year'],
          },
          {
            name: 'getTrec',
            queryKeys: ['year'],
          },
          {
            name: 'getTrecBySite',
            queryKeys: ['year', 'permission'],
          },
        ],
      },
    ],
  },
  wasteDetailRoute,
  electricityAnalysisRoute,
  waterAnalysisRoute,
  wasteAnalysisRoute,
];

const routes = [...publicRoutes, ...privateRoutes];

export default routes;
