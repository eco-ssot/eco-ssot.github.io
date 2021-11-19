import { useTranslation } from 'react-i18next';

import TablePage from '../table-page/TablePage';

import UnitElectricityHistoryTable from './UnitElectricityHistoryTable';
import UnitElectricityTable from './UnitElectricityTable';

export default function UnitElectricityPage() {
  const { t } = useTranslation('unitElectricityPage');
  return (
    <TablePage
      title={t('title')}
      downloadResource="singleelectric"
      table={UnitElectricityTable}
      historyTable={UnitElectricityHistoryTable}
    />
  );
}
