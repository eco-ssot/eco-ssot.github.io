import CarbonPage from '../pages/carbon/CarbonPage';
import ElectricityPage from '../pages/electricity/ElectricityPage';
import HomePage from '../pages/home/HomePage';
import OverviewPage from '../pages/overview/OverviewPage';
import RenewableEnergyPage from '../pages/renewable-energy/RenewableEnergyPage';
import UnitElectricityPage from '../pages/unit-electricity/UnitElectricityPage';
import WastePage from '../pages/waste/WastePage';
import WaterPage from '../pages/water/WaterPage';
import ManagementPage from '../pages/management/ManagementPage';

export const privateRoutes = [
  {
    path: '/home',
    title: '首頁',
    component: HomePage,
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
    title: '用電強度',
    component: ElectricityPage,
  },
  {
    path: '/water',
    title: '用水強度',
    component: WaterPage,
  },
  {
    path: '/unit-electricity',
    title: '單臺用電',
    component: UnitElectricityPage,
  },
  {
    path: '/waste',
    title: '廢棄物產生',
    component: WastePage,
  },
  {
    path: '/management',
    title: '後臺維護',
    component: ManagementPage,
  },
];
