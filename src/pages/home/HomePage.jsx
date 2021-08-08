import Panel from '../../components/panel/Panel';
import Overview from '../../components/overview/Overview';
import Carbon from '../../components/carbon/Carbon';
import Electricity from '../../components/electricity/Electricity';
import RenewableEnergy from '../../components/renewable-energy/RenewableEnergy';
import UnitElectricity from '../../components/unit-electricity/UnitElectricity';
import Waste from '../../components/waste/Waste';
import Water from '../../components/water/Water';

export default function HomePage() {
  return (
    <div className="grid grid-rows-3 grid-cols-3 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden">
      <Panel
        className="row-span-1 col-span-3"
        title="各數值 Overview"
        to="/overview"
        subtitle={
          <div className="flex h-8 pt-1 rounded shadow px-2 bg-primary-900 border-l-4 border-solid border-primary-600">
            累計區間：2021.01 - 06
          </div>
        }>
        <Overview />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="碳排放量" to="/carbon">
        <Carbon />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="可再生能源占比" to="/renewable-energy">
        <RenewableEnergy />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="用電強度" to="/electricity">
        <Electricity />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="廢棄物產生密度" to="/waste">
        <Waste />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="用水強度" to="/water">
        <Water />
      </Panel>
      <Panel className="row-span-1 col-span-1" title="單臺用電" to="/unit-electricity">
        <UnitElectricity />
      </Panel>
    </div>
  );
}
