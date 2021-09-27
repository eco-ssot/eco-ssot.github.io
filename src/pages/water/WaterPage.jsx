import TablePage from '../table-page/TablePage';

import WaterHistoryTable from './WaterHistoryTable';
import WaterTable from './WaterTable';

export default function WaterPage() {
  return <TablePage title="十億營業額用水" table={WaterTable} historyTable={WaterHistoryTable} />;
}
