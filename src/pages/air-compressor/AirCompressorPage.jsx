import { useMemo, useRef } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import ButtonGroup from '../../components/button/ButtonGroup';
import useNavigate from '../../router/useNavigate';

import AirCompressorForm from './AirCompressorForm';
import MaintenanceForm from './MaintenanceForm';
import MaintenancePanel from './MaintenancePanel';
import RecommendationPanel from './RecommendationPanel';
import RoiPanel from './RoiPanel';
import TabPanel from './TabPanel';

const TAB_OPTIONS = (t) => [
  { key: 'RECOMMENDATION', value: 'recommendation' },
  { key: 'MAINTENANCE', value: 'maintenance' },
];

export default function AirCompressorPage() {
  const { t } = useTranslation(['airCompressorPage', 'common']);
  const tabOptions = useMemo(() => TAB_OPTIONS(t), [t]);
  const draftRef = useRef();
  const navigate = useNavigate();
  return (
    <div className="-mt-16 flex h-screen w-screen flex-col space-y-4 overflow-hidden p-4 pt-20">
      <TabPanel>
        {({ isMaintenance, data, query }) => (
          <>
            <div className="rounded bg-primary-900 p-4 shadow">
              <div className="relative flex items-start justify-center">
                <div className="absolute left-0 text-xl font-medium">
                  {t('airCompressorPage:airCompressorDeviceAiRecommendation')}
                </div>
                <ButtonGroup
                  className={clsx(
                    'absolute',
                    import.meta.env.VITE_HIDE_AIR_COMPRESSOR_MAINTENANCE === '1' && 'invisible'
                  )}
                  options={tabOptions}
                  selected={isMaintenance ? tabOptions[1] : tabOptions[0]}
                  onChange={(e) => navigate({ hash: e.key }, { merge: false })}
                />
              </div>
              {isMaintenance ? (
                <MaintenanceForm query={query} draftRef={draftRef} />
              ) : (
                <AirCompressorForm query={query} draftRef={draftRef} />
              )}
            </div>
            <div className="grid flex-grow grid-rows-2 gap-4 overflow-auto">
              <RoiPanel data={data} query={query} />
              {isMaintenance ? (
                <MaintenancePanel className="row-span-1" data={data} machineId={query.machine_id} />
              ) : (
                <RecommendationPanel className="row-span-1" data={data} />
              )}
            </div>
          </>
        )}
      </TabPanel>
    </div>
  );
}
