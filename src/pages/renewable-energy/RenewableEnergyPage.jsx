import { useTranslation } from 'react-i18next';

import TablePage from '../table-page/TablePage';

import RenewableEnergyHistoryTable from './RenewableEnergyHistoryTable';
import RenewableEnergyTable from './RenewableEnergyTable';

export default function RenewableEnergyPage() {
  const { t } = useTranslation('renewableEnergyPage');
  return (
    <TablePage
      title={t('title')}
      downloadResource="renewableenergy"
      table={RenewableEnergyTable}
      historyTable={RenewableEnergyHistoryTable}
    />
  );
}
