import { useTranslation } from 'react-i18next';

import TablePage from '../table-page/TablePage';

import ElectricityHistoryTable from './ElectricityHistoryTable';
import ElectricityTable from './ElectricityTable';

export default function ElectricityPage() {
  const { t } = useTranslation('electricityPage');
  return (
    <TablePage
      title={t('title')}
      downloadResource="electric"
      table={ElectricityTable}
      historyTable={ElectricityHistoryTable}
    />
  );
}
