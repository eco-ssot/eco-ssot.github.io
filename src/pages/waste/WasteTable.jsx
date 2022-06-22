import { useMemo, useState } from 'react';

import { UploadIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import IconButton from '../../components/button/IconButton';
import Dot from '../../components/dot/Dot';
import GlobalDateSelect from '../../components/select/GlobalDateSelect';
import Table from '../../components/table/Table';
import DualTag from '../../components/tag/DualTag';
import UploadModal from '../../components/upload-modal/UploadModal';
import useGoal from '../../hooks/useGoal';
import usePlantPermission from '../../hooks/usePlantPermission';
import MyNavLink from '../../router/MyNavLink';
import { wasteAnalysisRoute } from '../../router/routes';
import { useGetWasteQuery, useUploadWasteExcelMutation, wasteApi } from '../../services/waste';
import { formatMonthRange } from '../../utils/date';
import { ratioFormatter, statisticsFormatter, targetFormatter } from '../../utils/formatter';
import { addPaddingColumns, EXPAND_COLUMN, getHidePlantRowProps, noDataRenderer } from '../../utils/table';

const HEADERS = ({
  t,
  pct,
  maxDate,
  currYear,
  periodType,
  baseYear = APP_CONSTANTS.BASE_YEAR_WASTE,
  setOpen = () => {},
} = {}) => [
  {
    key: 'nonRecyclable',
    name: t('wastePage:table.nonRecyclable.header'),
    subHeaders: [
      {
        key: 'normal',
        name: t('wastePage:table.nonRecyclable.normal'),
      },
      { key: 'harmful', name: t('wastePage:table.nonRecyclable.harmful') },
    ],
  },
  {
    key: 'recyclable',
    name: t('wastePage:table.recyclable.header'),
    subHeaders: [
      {
        key: 'normal',
        name: t('wastePage:table.recyclable.normal'),
      },
      {
        key: 'waste',
        name: t('wastePage:table.recyclable.waste'),
      },
    ],
  },
  {
    key: 'total',
    name: (
      <>
        <div className="text-right">Total</div>
        <div className="text-right">({t('common:metricTon')})</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'revenue',
    name: (
      <>
        <div className="text-right">
          {t('wastePage:table.revenue.header', { ytm: formatMonthRange(maxDate, periodType) })}
        </div>
        <div className="text-right">({t('common:billionNtd')})</div>
      </>
    ),
    rowSpan: 0,
  },
  {
    key: 'waste',
    name: t('wastePage:table.waste.header'),
    subHeaders: [
      { key: 'currYear', name: formatMonthRange(maxDate, periodType) },
      { key: 'baseYear', name: baseYear },
      {
        key: 'delta',
        name: t('wastePage:table.waste.delta', { baseYear, currYear }),
        renderer: (cell) => {
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
                to={{ search, pathname: './analysis' }}
                onMouseEnter={() => {
                  wasteAnalysisRoute.element.preload();
                  prefetchAnalysis({ ...query, PREFETCH: '/waste' });
                  prefetchExplanation({ ...query, PREFETCH: '/waste' });
                }}>
                {isFinite(cell.value) && cell.value > -pct && <Dot />}
                {targetFormatter(-pct, { formatter: ratioFormatter, className: 'underline' })(cell)}
              </MyNavLink>
            );
          }

          return targetFormatter(-pct, { formatter: ratioFormatter })(cell);
        },
      },
    ],
  },
  {
    key: 'recycleRate',
    name: <div className="text-center">{t('wastePage:table.recycleRate')}</div>,
    renderer: (cell) => {
      return (
        <div className="flex items-center justify-end space-x-2">
          <div>{ratioFormatter(cell)}</div>
          <IconButton
            className={clsx(
              'rounded-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-primary-900',
              (!cell.row.canExpand || /wks|wzs/i.test(cell.row.original.site)) && 'invisible'
            )}
            onClick={() => setOpen(true)}>
            <UploadIcon className="h-5 w-5" />
          </IconButton>
        </div>
      );
    },
    className: 'pr-0',
    rowSpan: 0,
  },
];

const COLUMNS = ({
  t,
  pct,
  maxDate,
  currYear,
  missing,
  periodType,
  baseYear = APP_CONSTANTS.BASE_YEAR_WASTE,
  setOpen = () => {},
} = {}) =>
  addPaddingColumns([
    { ...EXPAND_COLUMN },
    {
      Header: 'Site',
      accessor: 'site',
      rowSpan: 0,
      Cell: noDataRenderer({ missing }),
      className: 'whitespace-nowrap',
    },
    ...HEADERS({ t, pct, maxDate, currYear, baseYear, periodType, setOpen }).map(
      ({ key, name, subHeaders, renderer = statisticsFormatter(3), ...rest }) => ({
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
      })
    ),
  ]);

export default function WasteTable({ business, y, m, s, p, pt, missingPlants }) {
  const { t } = useTranslation(['wastePage', 'common']);
  const plantPermission = usePlantPermission();
  const { data } = useGetWasteQuery({
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

  const { label, pct, baseYear, currYear } = useGoal({ keyword: '廢棄物密度' });
  const [uploadExcel, { isSuccess }] = useUploadWasteExcelMutation();
  const [open, setOpen] = useState(false);
  const columns = useMemo(
    () =>
      COLUMNS({
        t,
        setOpen,
        pct,
        currYear,
        lastYear: baseYear,
        maxDate: data?.maxDate,
        missing: missingPlants,
        periodType: pt,
      }),
    [t, pct, currYear, baseYear, data?.maxDate, missingPlants, pt]
  );

  return (
    <>
      <UploadModal
        title={t('wastePage:upload.uploadWaste')}
        open={open}
        setOpen={setOpen}
        uploadExcel={uploadExcel}
        isSuccess={isSuccess}
      />
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
