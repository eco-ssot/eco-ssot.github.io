import { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import LinkButtonGroup from '../../components/button/LinkButtonGroup';
import PageContainer from '../../components/page-container/PageContainer';
import { selectBusiness, selectYear, selectDimension } from '../../renderless/location/locationSlice';

import OverviewHistoryTable from './OverviewHistoryTable';
import OverviewTable from './OverviewTable';

const ROUTES = (path) => [
  { path, label: '當年度' },
  { path: `${path}/history`, label: '歷史年度' },
];

export default function OverviewPage() {
  const business = useSelector(selectBusiness);
  const year = useSelector(selectYear);
  const dimension = useSelector(selectDimension);
  const { path } = useRouteMatch();
  const routes = useMemo(() => ROUTES(path), [path]);
  return (
    <PageContainer className="flex flex-col relative space-y-2">
      <div className="text-xl font-medium">用電、用水、營收及ASP比較</div>
      <LinkButtonGroup routes={routes} className="self-center" />
      <Switch>
        <Route exact path={path} render={() => <OverviewTable business={business} />} />
        <Route
          path={path}
          render={() => <OverviewHistoryTable business={business} year={year} dimension={dimension} />}
        />
      </Switch>
    </PageContainer>
  );
}
