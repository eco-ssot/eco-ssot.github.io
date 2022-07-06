import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import ButtonGroup from '../../components/button/ButtonGroup';
import HistorySearch from '../../components/history-search/HistorySearch';
import Legend from '../../components/legend/Legend';
import OverviewSearch from '../../components/overview-search/OverviewSearch';
import useNavigate from '../../router/useNavigate';
import ElectricityIndexPage from '../electricity-index/ElectricityIndexPage';

import TablePanel from './TablePanel';

export default function TablePage({ title, downloadResource, table: Table, historyTable: HistoryTable }) {
  const { t } = useTranslation(['component']);
  const navigate = useNavigate();
  return (
    <TablePanel>
      {({ isHistory, isOverview, option, prevOption, missingPlants, year, showElectricityIndex, showHistoryTab }) => (
        <>
          <div className="flex h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-full flex-col overflow-auto">
            <div
              className={clsx(
                'relative m-4 mb-0 flex flex-col space-y-2 rounded bg-primary-900 p-4',
                showElectricityIndex ? 'h-auto' : 'h-[calc(100vh-6rem)]'
              )}
            >
              <div className="text-xl font-medium">{title}</div>
              <div className="flex items-end justify-center">
                <ButtonGroup
                  className={clsx(!showHistoryTab && 'invisible')}
                  options={APP_CONSTANTS.HISTORY_OPTIONS}
                  selected={isHistory ? APP_CONSTANTS.HISTORY_OPTIONS[1] : APP_CONSTANTS.HISTORY_OPTIONS[0]}
                  onChange={(e) =>
                    navigate(
                      {
                        hash: e.key,
                        ...(!isHistory && { ...prevOption }),
                      },
                      { merge: false }
                    )
                  }
                />
                <div className="absolute right-4 flex space-x-4">
                  <Legend dotClassName="bg-dangerous-500" label={t('component:legend.missTarget')} />
                  <Legend dotClassName="bg-green-500" label={t('component:legend.meetTarget')} />
                  <div className="rounded border border-dangerous-700 bg-dangerous-900 px-1">
                    {t('component:legend.missingData')}
                  </div>
                </div>
              </div>
              {isHistory ? (
                <>
                  {isOverview ? (
                    <OverviewSearch option={option} onSearch={navigate} downloadResource={downloadResource} />
                  ) : (
                    <HistorySearch option={option} onSearch={navigate} downloadResource={downloadResource} />
                  )}
                  <HistoryTable {...option} />
                </>
              ) : (
                <>
                  <Table {...option} missingPlants={missingPlants} />
                </>
              )}
            </div>
            <div>
              {showElectricityIndex && (
                <ElectricityIndexPage
                  className="-mt-16 mr-2 h-screen w-full overflow-hidden pt-16"
                  year={year}
                  plant={option.p || option.s}
                />
              )}
            </div>
          </div>
        </>
      )}
    </TablePanel>
  );
}
