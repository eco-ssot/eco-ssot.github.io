import Modal from '../../components/modal/Modal';
import { useGetVersionQuery } from '../../services/management';
import TourIndexPage from '../tour/TourIndexPage';

export default function TourPanel({ open = false, setOpen = () => {} }) {
  const { data: { data: versions } = {} } = useGetVersionQuery();
  const newVersions = versions?.filter((version) => {
    return version.version === versions[0].version;
  });

  return (
    <>
      <Modal
        className="my-0 max-w-[calc(100vw-6rem)]"
        open={!!open}
        setOpen={setOpen}
        title="新功能導覽"
        defaultFooter={false}
      >
        <TourIndexPage className="h-[calc(100vh-6rem)] w-[calc(100vw-6rem)] bg-gray-900" data={newVersions} />
      </Modal>
    </>
  );
}
