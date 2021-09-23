import AnalysisSkeleton from '../components/skeleton/AnalysisSkeleton';
import HomeSkeleton from '../components/skeleton/HomeSkeleton';
import ManagementSkeleton from '../components/skeleton/ManagementSkeleton';
import CarbonPage from '../pages/carbon/CarbonPage';
import ElectricityAnalysisPage from '../pages/electricity/ElectricityAnalysisPage';
import ElectricityPage from '../pages/electricity/ElectricityPage';
import ErrorPage from '../pages/error/ErrorPage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import ManagementPage from '../pages/management/ManagementPage';
import OverviewPage from '../pages/overview/OverviewPage';
import RenewableEnergyPage from '../pages/renewable-energy/RenewableEnergyPage';
import UnauthorizedPage from '../pages/unauthorized/UnauthorizedPage';
import UnitElectricityPage from '../pages/unit-electricity/UnitElectricityPage';
import WasteAnalysisPage from '../pages/waste/WasteAnalysisPage';
import WastePage from '../pages/waste/WastePage';
import WaterAnalysisPage from '../pages/water/WaterAnalysisPage';
import WaterPage from '../pages/water/WaterPage';

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
    component: HomePage,
    skeleton: HomeSkeleton,
  },
  {
    path: '/overview',
    title: '總覽比較',
    component: OverviewPage,
  },
  {
    path: '/carbon',
    title: '碳排放量',
    component: CarbonPage,
  },
  {
    path: '/renewable-energy',
    title: '可再生能源',
    component: RenewableEnergyPage,
  },
  {
    path: '/electricity',
    title: '用電',
    component: ElectricityPage,
  },
  {
    path: '/water',
    title: '用水',
    component: WaterPage,
  },
  {
    path: '/unit-electricity',
    title: '單台用電',
    component: UnitElectricityPage,
  },
  {
    path: '/waste',
    title: '廢棄物',
    component: WastePage,
  },
  {
    path: '/management',
    title: '後台維護',
    component: ManagementPage,
    skeleton: ManagementSkeleton,
  },
];

export const subRoutes = [
  {
    path: '/electricity/analysis',
    title: '用電第三階段分析',
    component: ElectricityAnalysisPage,
    skeleton: AnalysisSkeleton,
    show: false,
  },
  {
    path: '/water/analysis',
    title: '用水第三階段分析',
    component: WaterAnalysisPage,
    skeleton: AnalysisSkeleton,
    show: false,
  },
  {
    path: '/waste/analysis',
    title: '廢棄物第三階段分析',
    component: WasteAnalysisPage,
    skeleton: AnalysisSkeleton,
    show: false,
  },
];

const routes = [...publicRoutes, ...privateRoutes, ...subRoutes];

export default routes;
