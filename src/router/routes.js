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
    key: 'login',
  },
  {
    path: '/unauthorized',
    title: '',
    component: UnauthorizedPage,
    key: 'unauthorized',
  },
  {
    path: '/error',
    title: '',
    component: ErrorPage,
    key: 'error',
  },
];

export const privateRoutes = [
  {
    path: '/home',
    title: '首頁',
    component: HomePage,
    skeleton: HomeSkeleton,
    key: 'home',
  },
  {
    path: '/overview',
    title: '總覽比較',
    component: OverviewPage,
    key: 'overview',
  },
  {
    path: '/carbon',
    title: '碳排放量',
    component: CarbonPage,
    key: 'carbon',
  },
  {
    path: '/renewable-energy',
    title: '可再生能源',
    component: RenewableEnergyPage,
    key: 'renewableEnergy',
  },
  {
    path: '/electricity',
    title: '用電',
    component: ElectricityPage,
    key: 'electricity',
  },
  {
    path: '/water',
    title: '用水',
    component: WaterPage,
    key: 'water',
  },
  {
    path: '/unit-electricity',
    title: '約當單台用電',
    component: UnitElectricityPage,
    key: 'unitElectricity',
  },
  {
    path: '/waste',
    title: '廢棄物',
    component: WastePage,
    key: 'waste',
  },
  {
    path: '/management',
    title: '後台設定',
    component: ManagementPage,
    skeleton: ManagementSkeleton,
    exact: false,
    key: 'management',
  },
  {
    path: '/electricity/analysis',
    title: '用電第三階段分析',
    component: ElectricityAnalysisPage,
    skeleton: AnalysisSkeleton,
    show: false,
    key: 'electricityAnalysis',
  },
  {
    path: '/water/analysis',
    title: '用水第三階段分析',
    component: WaterAnalysisPage,
    skeleton: AnalysisSkeleton,
    show: false,
    key: 'waterAnalysis',
  },
  {
    path: '/waste/analysis',
    title: '廢棄物第三階段分析',
    component: WasteAnalysisPage,
    skeleton: AnalysisSkeleton,
    show: false,
    key: 'wasteAnalysis',
  },
];

const routes = [...publicRoutes, ...privateRoutes];

export default routes;
