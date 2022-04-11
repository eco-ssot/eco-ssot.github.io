const CURRENT_YEAR = new Date().getFullYear();
const LAST_YEAR = CURRENT_YEAR - 1;
const BASE_YEAR = 2016;
const MIN_YEAR = 2020;
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - MIN_YEAR + 1 }, (_, i) => ({
  key: String(CURRENT_YEAR - i),
  value: String(CURRENT_YEAR - i),
}));

const BUSINESS_OPTIONS = [
  { key: 'ALL', value: 'ALL', alias: 'ALL' },
  { key: 'WT', value: 'WT', alias: 'WT' },
  { key: 'WSD', value: 'WSD', alias: 'WSD' },
  { key: 'Others', value: '新邊界', alias: '新邊界' },
];

const BUSINESS_MAPPING = {
  ALL: 'ALL',
  WT: 'WT',
  WSD: 'WSD',
  Others: 'Others',
};

const HISTORY_OPTIONS = [
  { key: 'CURRENT', value: 'currentYear' },
  { key: 'HISTORY', value: 'historyYear' },
];

const HISTORY_MAPPING = {
  CURRENT: 'CURRENT',
  HISTORY: 'HISTORY',
};

const DIMENSION_OPTIONS = [
  { key: 'All', value: 'ALL' },
  { key: 'site', value: 'By Site' },
  { key: 'plant', value: 'By Plant' },
];

const DIMENSION_MAPPING = {
  ALL: 'All',
  SITE: 'site',
  PLANT: 'plant',
};

const MONTH_RANGE_OPTIONS = [
  { key: 'YTM', value: 'Year To Month' },
  { key: 'single', value: 'Single Month' },
];

const MONTH_RANGE_MAPPING = {
  YTM: 'YTM',
  SINGLE: 'single',
};

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  key: String(i + 1),
  value: String(i + 1),
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

const LANGUAGE_OPTIONS = [
  { key: 'zh', value: '中文' },
  { key: 'en', value: 'English' },
];

const ELECTRICITY_TYPES = [
  { key: 'basic', value: 'basicElectricity' },
  { key: 'air_condition', value: 'airCondition' },
  { key: 'air_compressor', value: 'airCompress' },
  { key: 'air_production', value: 'production' },
];

const ELECTRICITY_TYPE_MAPPING = {
  basic: '基礎用電',
  air_condition: '空調用電',
  air_compressor: '空壓用電',
  air_production: '生產用電',
};

const ELECTRICITY_OPTIONS = [
  { key: 'basic', value: 'basic' },
  { key: 'air_condition', value: 'air_condition' },
  { key: 'air_compressor', value: 'air_compressor' },
  { key: 'air_production', value: 'air_production' },
];

const DEPRECIATED_PLANTS = ['WKS-6A', 'WKS-1'];
const HIDE_PLANTS = ['WMX', 'WCZ'];
const KEYCLOAK_DEFAULT_ROLES = ['offline_access', 'uma_authorization'];
const MAINTAINER_ROLE = 'target_maintainer';
const DEVELOPER_ROLE = 'developer';
const NO_DATA = 'No Data';
const GLOBAL_QUERY_KEYS = ['business', 'y', 'm', 'cy', 's', 'p'];

const APP_CONSTANTS = {
  NO_DATA,
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
  MONTH_RANGE_MAPPING,
  KEYCLOAK_DEFAULT_ROLES,
  MAINTAINER_ROLE,
  DEVELOPER_ROLE,
  LANGUAGE_OPTIONS,
  ELECTRICITY_TYPES,
  ELECTRICITY_TYPE_MAPPING,
  ELECTRICITY_OPTIONS,
  DEPRECIATED_PLANTS,
  HIDE_PLANTS,
  GLOBAL_QUERY_KEYS,
  CURRENT_YEAR: String(CURRENT_YEAR),
  LAST_YEAR: String(LAST_YEAR),
  BASE_YEAR: String(BASE_YEAR),
  BASE_YEAR_CARBON: process.env.REACT_APP_BASE_YEAR_CARBON || '2016',
  BASE_YEAR_WATER: process.env.REACT_APP_BASE_YEAR_WATER || '2016',
  BASE_YEAR_ELECTRICITY: process.env.REACT_APP_BASE_YEAR_ELECTRICITY || '2020',
  BASE_YEAR_UNIT_ELECTRICITY: process.env.REACT_APP_BASE_YEAR_UNIT_ELECTRICITY || '2020',
  BASE_YEAR_WASTE: process.env.REACT_APP_BASE_YEAR_WASTE || '2018',
};

export default APP_CONSTANTS;
