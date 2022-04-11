import Panel from '../../components/panel/Panel';

export default function HomePageSkeleton() {
  return (
    <div className="-mt-16 grid h-screen w-screen grid-cols-3 grid-rows-3 gap-4 overflow-hidden p-4 pt-20">
      <Panel className="col-span-3 row-span-1" />
      <Panel className="col-span-1 row-span-1" />
      <Panel className="col-span-1 row-span-1" />
      <Panel className="col-span-1 row-span-1" />
      <Panel className="col-span-1 row-span-1" />
      <Panel className="col-span-1 row-span-1" />
      <Panel className="col-span-1 row-span-1" />
    </div>
  );
}
