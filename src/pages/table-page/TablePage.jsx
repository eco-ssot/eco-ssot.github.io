import ButtonGroup from '../../components/button/ButtonGroup';
import HistorySearch from '../../components/history-search/HistorySearch';
import Legend from '../../components/legend/Legend';
import OverviewSearch from '../../components/overview-search/OverviewSearch';
import PageContainer from '../../components/page-container/PageContainer';
import APP_CONFIG from '../../constants/app-config';
import { navigate } from '../../router/helpers';

import TablePanel from './TablePanel';

export default function TablePage({ title, downloadResource, table: Table, historyTable: HistoryTable }) {
  return (
    <PageContainer className="flex flex-col relative space-y-2">
      <div className="text-xl font-medium">{title}</div>
      <TablePanel>
        {({ isHistory, isOverview, option, prevOption }) => (
          <>
            <div className="flex justify-center items-end">
              <ButtonGroup
                options={APP_CONFIG.HISTORY_OPTIONS}
                selected={isHistory ? APP_CONFIG.HISTORY_OPTIONS[1] : APP_CONFIG.HISTORY_OPTIONS[0]}
                onChange={(e) =>
                  navigate(
                    { hash: e.key, business: option.business, ...(!isHistory && { ...prevOption }) },
                    { merge: false }
                  )
                }
              />
              <div className="flex absolute right-4 space-x-4">
                <Legend dotClassName="bg-dangerous-500" label="未達標" />
                <Legend dotClassName="bg-green-500" label="達標" />
                <div className="bg-dangerous-900 rounded border border-dangerous-600 px-1">資料缺漏</div>
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
                <Table {...option} />
              </>
            )}
          </>
        )}
      </TablePanel>
    </PageContainer>
  );
}
