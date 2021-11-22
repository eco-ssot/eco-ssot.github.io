import { useTranslation } from 'react-i18next';

import TablePage from '../table-page/TablePage';

import WasteHistoryTable from './WasteHistoryTable';
import WasteTable from './WasteTable';

export default function WastePage() {
  const { t } = useTranslation(['wastePage']);
  return <TablePage title={t('title')} downloadResource="waste" table={WasteTable} historyTable={WasteHistoryTable} />;
}
