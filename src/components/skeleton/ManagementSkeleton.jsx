export default function ManagementSkeleton({ pathname }) {
  return (
    <div className="grid grid-cols-8 grid-rows-2 max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] w-full p-4 gap-4 overflow-hidden">
      <div className="row-span-2 col-span-1">
        <div className="bg-primary-900 rounded shadow p-4 h-full flex flex-col"></div>
      </div>
      {pathname === '/management' || pathname === '/management/goal' ? (
        <>
          <div className="row-span-1 col-span-7">
            <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4"></div>
          </div>
          <div className="row-span-1 col-span-2">
            <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4"></div>
          </div>
          <div className="row-span-1 col-span-5">
            <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4"></div>
          </div>
        </>
      ) : (
        <div className="row-span-2 col-span-7">
          <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-6"></div>
        </div>
      )}
    </div>
  );
}
