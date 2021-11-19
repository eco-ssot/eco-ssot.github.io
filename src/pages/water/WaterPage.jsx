import { useTranslation } from 'react-i18next';

import TablePage from '../table-page/TablePage';

import WaterHistoryTable from './WaterHistoryTable';
import WaterTable from './WaterTable';

export default function WaterPage() {
  const { t } = useTranslation('waterPage');
  return <TablePage title={t('title')} downloadResource="water" table={WaterTable} historyTable={WaterHistoryTable} />;
}
