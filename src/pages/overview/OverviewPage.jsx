import TablePage from '../table-page/TablePage';

import OverviewHistoryTable from './OverviewHistoryTable';
import OverviewTable from './OverviewTable';

export default function OverviewPage() {
  return (
    <TablePage
      title="用電、用水、營收及ASP比較"
      downloadResource="overall"
      table={OverviewTable}
      historyTable={OverviewHistoryTable}
    />
  );
}
