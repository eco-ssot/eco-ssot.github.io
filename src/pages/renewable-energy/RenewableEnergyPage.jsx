import TablePage from '../table-page/TablePage';

import RenewableEnergyHistoryTable from './RenewableEnergyHistoryTable';
import RenewableEnergyTable from './RenewableEnergyTable';

export default function RenewableEnergyPage() {
  return <TablePage title="可再生能源占比" table={RenewableEnergyTable} historyTable={RenewableEnergyHistoryTable} />;
}
