import Panel from '../panel/Panel';

export default function HomeSkeleton() {
  return (
    <div className="grid grid-rows-3 grid-cols-3 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden">
      <Panel className="row-span-1 col-span-3" />
      <Panel className="row-span-1 col-span-1" />
      <Panel className="row-span-1 col-span-1" />
      <Panel className="row-span-1 col-span-1" />
      <Panel className="row-span-1 col-span-1" />
      <Panel className="row-span-1 col-span-1" />
      <Panel className="row-span-1 col-span-1" />
    </div>
  );
}
