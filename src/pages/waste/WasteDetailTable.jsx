import { useMemo } from 'react';

import qs from 'query-string';
import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import Dot from '../../components/dot/Dot';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import useGoal from '../../hooks/useGoal';
import usePlantPermission from '../../hooks/usePlantPermission';
import MyNavLink from '../../router/MyNavLink';
import { wasteAnalysisRoute } from '../../router/routes';
import { useGetWasteDetailQuery, wasteApi } from '../../services/waste';
import { ratioFormatter, statisticsFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

const AnalysisLink = (pct) => (cell) => {
  const prefetchAnalysis = wasteApi.usePrefetch('getWasteAnalysis');
  const prefetchExplanation = wasteApi.usePrefetch('getWasteExplanation');
  if (!cell.row.original.isFooter) {
    let query = {
      ...qs.parse(qs.pick(window.location.search, APP_CONSTANTS.GLOBAL_QUERY_KEYS)),
      site: cell.row.original.site,
    };

    if (cell.row.depth > 0) {
      query = {
        ...query,
        site: cell.rowsById[cell.row.id.split('.')[0]].original.site,
        plant: cell.row.original.site,
      };
    }

    query = { ...query, ...(query.s && { site: query.s }), ...(query.p && { plant: query.p }) };
    const search = qs.stringify(query);
    return (
      <MyNavLink
        className="flex items-center justify-end space-x-2"
        to={{ search, pathname: '/waste/analysis' }}
        onMouseEnter={() => {
          wasteAnalysisRoute.element.preload();
          prefetchAnalysis({ ...query, PREFETCH: '/waste/detail' });
          prefetchExplanation({ ...query, PREFETCH: '/waste/detail' });
        }}
        state={{ from: '/waste/detail', skipLoadingPage: true }}>
        {isFinite(cell.value) && cell.value > -pct && <Dot />}
        {targetFormatter(-pct, { formatter: ratioFormatter, className: 'underline' })(cell)}
      </MyNavLink>
    );
  }

  return targetFormatter(-pct, { formatter: ratioFormatter })(cell);
};

const HEADERS = ({ t, pct, currYear } = {}) => [
  {
    key: 'normal',
    name: (
      <div className="flex items-baseline space-x-1">
        <div>{t('一般廢棄物')}</div>
        <div className="text-sm">{t('(其他/廚餘)')}</div>
        <div>{t('(公噸)')}</div>
      </div>
    ),
    subHeaders: [
      {
        key: 'lastYear',
        name: t(`${currYear - 1} (a)`),
      },
      { key: 'currYear', name: t(`${currYear} (b)`) },
      { key: 'ratio', name: t('增減率 *'), renderer: ratioFormatter },
    ],
  },
  {
    key: 'manpower',
    name: t('人力'),
    subHeaders: [
      {
        key: 'lastYear',
        name: t(`${currYear - 1} (c)`),
        renderer: statisticsFormatter(0),
      },
      { key: 'currYear', name: t(`${currYear} (d)`), renderer: statisticsFormatter(0) },
      {
        key: 'ratio',
        name: t('增減率 *'),
        renderer: ratioFormatter,
      },
    ],
  },
  {
    key: 'wastePerPerson',
    name: t('人均廚餘 (公噸)'),
    subHeaders: [
      {
        key: 'lastYear',
        name: t(`${currYear - 1} (e=a/c)`),
      },
      { key: 'currYear', name: t(`${currYear} (f=b/d)`) },
      { key: 'ratio', name: t('增減率 *'), renderer: AnalysisLink(pct) },
    ],
  },
  {
    key: 'recycle',
    name: (
      <div className="flex items-baseline space-x-1">
        <div>{t('資源廢棄物')}</div>
        <div className="text-sm">{t('(堆肥 & 資源回收)')}</div>
        <div>{t('(公噸)')}</div>
      </div>
    ),
    subHeaders: [
      {
        key: 'lastYear',
        name: t(`${currYear - 1} (g)`),
      },
      { key: 'currYear', name: t(`${currYear} (h)`) },
      { key: 'ratio', name: t('增減率 *'), renderer: ratioFormatter },
    ],
  },
  {
    key: 'production',
    name: t('約當生產量 (台)'),
    subHeaders: [
      {
        key: 'lastYear',
        name: t(`${currYear - 1} (i)`),
        renderer: statisticsFormatter(0),
      },
      { key: 'currYear', name: t(`${currYear} (j)`), renderer: statisticsFormatter(0) },
      { key: 'ratio', name: t('增減率 *'), renderer: ratioFormatter },
    ],
  },
  {
    key: 'asp',
    name: t('約當千台資源廢棄物 (公噸)'),
    subHeaders: [
      {
        key: 'lastYear',
        name: t(`${currYear - 1} (k=g/i)`),
      },
      { key: 'currYear', name: t(`${currYear} (l=h/j)`) },
      { key: 'ratio', name: t('增減率 *'), renderer: AnalysisLink(pct) },
    ],
  },
];

const COLUMNS = ({ t, pct, currYear, missing } = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: noDataRenderer({ missing }),
      className: 'whitespace-nowrap',
    },
    ...HEADERS({ t, pct, currYear }).map(({ key, name, subHeaders, renderer = statisticsFormatter(3), ...rest }) => ({
      Header: name,
      Cell: renderer,
      ...(subHeaders && {
        id: name,
        Header: () => <div className="border-b border-divider py-3">{name}</div>,
        columns: subHeaders.map(({ key: _key, name: _name, renderer: _renderer = statisticsFormatter(3) }) => ({
          Header: _name,
          accessor: [key, _key].join('.'),
          Cell: _renderer,
          className: 'text-right',
        })),
      }),
      ...(!subHeaders && { accessor: key, className: 'text-right' }),
      ...rest,
    })),
  ]);

export default function WasteDetailTable({ business, y, m, s, p, pt, missingPlants }) {
  const { t } = useTranslation(['wastePage', 'common']);
  const plantPermission = usePlantPermission();
  const { data } = useGetWasteDetailQuery({
    business,
    year: y,
    month: m,
    site: s,
    plant: p,
    permission: plantPermission,
    ...(pt && {
      is_ytm: pt === APP_CONSTANTS.PERIOD_TYPES.YTM,
    }),
  });

  const { label, pct, currYear } = useGoal({ keyword: '廢棄物密度' });
  const columns = useMemo(
    () =>
      COLUMNS({
        pct,
        currYear,
        missing: missingPlants,
        t: (val) => val,
      }),
    [pct, currYear, missingPlants]
  );

  return (
    <>
      <DualTag
        className="absolute top-2 right-4"
        labels={[
          <div className="flex items-center">
            <GlobalDateSelect />
          </div>,
          label,
        ]}
      />
      {data && (
        <>
          <div className="h-6 w-full text-right">{t('wastePage:desc')}</div>
          <div className="flex w-full flex-col overflow-auto rounded-t-lg shadow">
            <Table
              columns={columns}
              data={data?.data || []}
              getRowProps={getHidePlantRowProps}
              autoResetExpanded={false}
            />
          </div>
        </>
      )}
    </>
  );
}
