import Panel from '../../components/panel/Panel';
import Overview from '../../components/overview/Overview';

export default function HomePage() {
  return (
    <div className="grid grid-rows-3 grid-cols-3 p-2 pt-18 -mt-16 gap-2 h-screen w-screen overflow-hidden">
      <Panel className="row-span-1 col-span-3" title="各數值 Overview" to="/overview">
        <Overview />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="碳排放量" to="/carbon"></Panel>
      <Panel
        className="row-span-1 col-span-1"
        title="可再生能源占比"
        to="/renewable-energy"></Panel>
      <Panel className="row-span-1 col-span-1" title="用電強度" to="/electricity"></Panel>
      <Panel className="row-span-1 col-span-1" title="廢棄物產生密度" to="/waste"></Panel>
      <Panel className="row-span-1 col-span-1" title="用水強度" to="/water"></Panel>
      <Panel className="row-span-1 col-span-1" title="單臺用電" to="/unit-electricity"></Panel>
    </div>
  );
}
