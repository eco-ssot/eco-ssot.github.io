import { useTranslation } from 'react-i18next';

import TablePage from '../table-page/TablePage';

import CarbonHistoryTable from './CarbonHistoryTable';
import CarbonTable from './CarbonTable';

export default function CarbonPage() {
  const { t } = useTranslation('carbonPage');
  return (
    <TablePage title={t('title')} downloadResource="carbon" table={CarbonTable} historyTable={CarbonHistoryTable} />
  );
}
