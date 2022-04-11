export default function GoalSkeleton() {
  return (
    <>
      <div className="col-span-7 row-span-1">
        <div className="flex h-full flex-col space-y-4 rounded bg-primary-900 p-4 shadow"></div>
      </div>
      <div className="col-span-2 row-span-1">
        <div className="flex h-full flex-col space-y-4 rounded bg-primary-900 p-4 shadow"></div>
      </div>
      <div className="col-span-5 row-span-1">
        <div className="flex h-full flex-col space-y-4 rounded bg-primary-900 p-4 shadow"></div>
      </div>
    </>
  );
}
