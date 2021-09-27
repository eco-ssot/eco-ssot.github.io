import TablePage from '../table-page/TablePage';

import CarbonHistoryTable from './CarbonHistoryTable';
import CarbonTable from './CarbonTable';

export default function CarbonPage() {
  return <TablePage title="碳排放管理" table={CarbonTable} historyTable={CarbonHistoryTable} />;
}
