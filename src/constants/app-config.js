const CURRENT_YEAR = new Date().getFullYear();
const LAST_YEAR = CURRENT_YEAR - 1;
const BASE_YEAR = 2016;
const YEAR_OPTIONS = Array.from({ length: LAST_YEAR - BASE_YEAR + 1 }, (_, i) => ({
  key: String(LAST_YEAR - i),
  value: String(LAST_YEAR - i),
}));

const BUSINESS_OPTIONS = [
  { key: 'ALL', value: 'ALL', alias: 'W.W' },
  { key: 'WT', value: 'WT', alias: 'WT' },
  { key: 'WSD', value: 'WSD', alias: 'WSD' },
];

const BUSINESS_MAPPING = {
  ALL: 'ALL',
  WT: 'WT',
  WSD: 'WSD',
};

const HISTORY_OPTIONS = [
  { key: 'CURRENT', value: '當年度' },
  { key: 'HISTORY', value: '歷史年度' },
];

const HISTORY_MAPPING = {
  CURRENT: 'CURRENT',
  HISTORY: 'HISTORY',
};

const DIMENSION_OPTIONS = [
  { key: 'All', value: 'ALL' },
  { key: 'Site', value: 'By Site' },
  { key: 'Plant', value: 'By Plant' },
];

const DIMENSION_MAPPING = {
  ALL: 'All',
  SITE: 'Site',
  PLANT: 'Plant',
};

const MONTH_RANGE_OPTIONS = [
  { key: 'SINGLE', value: 'Year To Month' },
  { key: 'YTM', value: '單月資料' },
];

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  key: String(i + 1),
  value: `${String(i + 1)}月`,
}));

const PLANT_OPTIONS = [
  { key: 'WNH', value: 'WNH' },
  { key: 'WHC', value: 'WHC' },
  { key: 'WKS-1', value: 'WKS-1' },
  { key: 'WZS-1', value: 'WZS-1' },
  { key: 'WZS-3', value: 'WZS-3' },
  { key: 'WZS-6', value: 'WZS-6' },
  { key: 'WCQ', value: 'WCQ' },
  { key: 'WCD', value: 'WCD' },
  { key: 'WMX', value: 'WMX' },
  { key: 'WCZ', value: 'WCZ' },
];

const SITE_OPTIONS = [
  { key: 'WNH', value: 'WNH' },
  { key: 'WHC', value: 'WHC' },
  { key: 'WKS', value: 'WKS' },
  { key: 'WCQ', value: 'WCQ' },
  { key: 'WCD', value: 'WCD' },
  { key: 'WMX', value: 'WMX' },
  { key: 'WCZ', value: 'WCZ' },
];

const KEYCLOAK_DEFAULT_ROLES = ['offline_access', 'uma_authorization'];
const EDIT_ROLE = 'target_maintainer';

const APP_CONFIG = {
  BUSINESS_OPTIONS,
  YEAR_OPTIONS,
  HISTORY_OPTIONS,
  DIMENSION_OPTIONS,
  MONTH_RANGE_OPTIONS,
  MONTH_OPTIONS,
  SITE_OPTIONS,
  PLANT_OPTIONS,
  BUSINESS_MAPPING,
  HISTORY_MAPPING,
  DIMENSION_MAPPING,
  KEYCLOAK_DEFAULT_ROLES,
  EDIT_ROLE,
  CURRENT_YEAR: String(CURRENT_YEAR),
  LAST_YEAR: String(LAST_YEAR),
  BASE_YEAR: String(BASE_YEAR),
  BASE_YEAR_CARBON: process.env.REACT_APP_BASE_YEAR_CARBON || '2016',
  BASE_YEAR_WATER: process.env.REACT_APP_BASE_YEAR_WATER || '2016',
  BASE_YEAR_ELECTRICITY: process.env.REACT_APP_BASE_YEAR_ELECTRICITY || '2020',
  BASE_YEAR_UNIT_ELECTRICITY: process.env.REACT_APP_BASE_YEAR_UNIT_ELECTRICITY || '2020',
  BASE_YEAR_WASTE: process.env.REACT_APP_BASE_YEAR_WASTE || '2018',
};

export default APP_CONFIG;
