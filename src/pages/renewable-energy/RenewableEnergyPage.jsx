import { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';

import LinkButtonGroup from '../../components/button/LinkButtonGroup';
import PageContainer from '../../components/page-container/PageContainer';
import {
  selectBusiness,
  selectDimension,
  selectEndMonth,
  selectEndYear,
  selectMonthType,
  selectStartMonth,
  selectStartYear,
} from '../../renderless/location/locationSlice';

import RenewableEnergyHistoryTable from './RenewableEnergyHistoryTable';
import RenewableEnergyTable from './RenewableEnergyTable';

const ROUTES = (path) => [
  { path, label: '當年度' },
  { path: `${path}/history`, label: '歷史年度' },
];

export default function RenewableEnergyPage() {
  const business = useSelector(selectBusiness);
  const startYear = useSelector(selectStartYear);
  const endYear = useSelector(selectEndYear);
  const monthType = useSelector(selectMonthType);
  const startMonth = useSelector(selectStartMonth);
  const endMonth = useSelector(selectEndMonth);
  const dimension = useSelector(selectDimension);
  const { path } = useRouteMatch();
  const routes = useMemo(() => ROUTES(path), [path]);
  return (
    <PageContainer className="flex flex-col relative space-y-2">
      <div className="text-xl font-medium">可再生能源占比</div>
      <LinkButtonGroup routes={routes} className="self-center" />
      <Switch>
        <Route exact path={path} render={() => <RenewableEnergyTable business={business} />} />
        <Route
          path={path}
          render={() => (
            <RenewableEnergyHistoryTable
              business={business}
              startYear={startYear}
              endYear={endYear}
              monthType={monthType}
              startMonth={startMonth}
              endMonth={endMonth}
              dimension={dimension}
            />
          )}
        />
      </Switch>
    </PageContainer>
  );
}
