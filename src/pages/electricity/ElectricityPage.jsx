import TablePage from '../table-page/TablePage';

import ElectricityHistoryTable from './ElectricityHistoryTable';
import ElectricityTable from './ElectricityTable';

export default function ElectricityPage() {
  return <TablePage title="十億營業額用電" table={ElectricityTable} historyTable={ElectricityHistoryTable} />;
}
