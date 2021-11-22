import { useTranslation } from 'react-i18next';

import TablePage from '../table-page/TablePage';

import OverviewHistoryTable from './OverviewHistoryTable';
import OverviewTable from './OverviewTable';

export default function OverviewPage() {
  const { t } = useTranslation(['overviewPage']);
  return (
    <TablePage
      title={t('title')}
      downloadResource="overall"
      table={OverviewTable}
      historyTable={OverviewHistoryTable}
    />
  );
}
