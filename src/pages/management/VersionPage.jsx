import version from '../../../version.json';

export default function VersionPage() {
  return (
    <div className="row-span-2 col-span-7 ">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-2">
        <div className="text-xl font-medium space-y-2">版本異動</div>
        {Object.entries(version)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([key, value]) => (
            <div key={key}>
              {key} : {value}
            </div>
          ))}
      </div>
    </div>
  );
}
