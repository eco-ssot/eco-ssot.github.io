import TablePage from '../table-page/TablePage';

import WasteHistoryTable from './WasteHistoryTable';
import WasteTable from './WasteTable';

export default function WastePage() {
  return (
    <TablePage title="廢棄物產生密度" downloadResource="waste" table={WasteTable} historyTable={WasteHistoryTable} />
  );
}
