import ButtonGroup from '../../components/button/ButtonGroup';
import HistorySearch from '../../components/history-search/HistorySearch';
import OverviewSearch from '../../components/overview-search/OverviewSearch';
import PageContainer from '../../components/page-container/PageContainer';
import APP_CONFIG from '../../constants/app-config';
import { navigate } from '../../router/helpers';

import TablePanel from './TablePanel';

export default function TablePage({ title, table: Table, historyTable: HistoryTable }) {
  return (
    <PageContainer className="flex flex-col relative space-y-2">
      <div className="text-xl font-medium">{title}</div>
      <TablePanel>
        {({ isHistory, isOverview, option, prevOption }) => (
          <>
            <ButtonGroup
              className="self-center"
              options={APP_CONFIG.HISTORY_OPTIONS}
              selected={isHistory ? APP_CONFIG.HISTORY_OPTIONS[1] : APP_CONFIG.HISTORY_OPTIONS[0]}
              onChange={(e) =>
                navigate(
                  { hash: e.key, business: option.business, ...(!isHistory && { ...prevOption }) },
                  { merge: false }
                )
              }
            />
            {isHistory ? (
              <>
                {isOverview ? (
                  <OverviewSearch option={option} onSearch={navigate} />
                ) : (
                  <HistorySearch option={option} onSearch={navigate} />
                )}
                <HistoryTable {...option} />
              </>
            ) : (
              <Table {...option} />
            )}
          </>
        )}
      </TablePanel>
    </PageContainer>
  );
}
