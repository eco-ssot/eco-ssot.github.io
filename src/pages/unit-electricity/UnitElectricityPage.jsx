import TablePage from '../table-page/TablePage';

import UnitElectricityHistoryTable from './UnitElectricityHistoryTable';
import UnitElectricityTable from './UnitElectricityTable';

export default function UnitElectricityPage() {
  return <TablePage title="單台用電" table={UnitElectricityTable} historyTable={UnitElectricityHistoryTable} />;
}
