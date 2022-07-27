import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from '../../components/button/Button';
import Dialog from '../../components/dialog/Dialog';
import Ellipsis from '../../components/ellipsis/Ellipsis';
import DatePicker from '../../components/input/DatePicker';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import useNavigate from '../../router/useNavigate';
import { useGetMaintenanceListQuery } from '../../services/airCompressor';
import { trimNumber } from '../../utils/number';

export default function MaintenanceForm({ query, draftRef }) {
  const { t } = useTranslation(['airCompressorPage']);
  const [searchOption, setSearchOption] = useState(query);
  const { data: list } = useGetMaintenanceListQuery();
  const { data: listByBuilding } = useGetMaintenanceListQuery(
    { building: searchOption.building || list?.data?.building?.[0]?.value },
    { skip: !list?.data?.building?.[0]?.value }
  );

  const { data: listByBuildingMachine } = useGetMaintenanceListQuery(
    {
      building: searchOption.building || listByBuilding?.data?.building?.[0]?.value,
      machine: listByBuilding?.data?.machine_id?.includes(searchOption.machine_id)
        ? searchOption.machine_id
        : listByBuilding?.data?.machine_id?.[0],
    },
    { skip: !listByBuilding?.data?.building?.[0]?.value || !listByBuilding?.data?.machine_id?.[0] }
  );

  const buildingOptions = useMemo(
    () => list?.data?.building?.map((val) => ({ key: val.value, value: val.key })),
    [list?.data?.building]
  );

  const machineOptions = useMemo(
    () => listByBuilding?.data?.machine_id?.map((val) => ({ key: val, value: val })),
    [listByBuilding?.data?.machine_id]
  );

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      maintain_cost: listByBuildingMachine?.data?.maintain_cost?.[0],
      maintain_hour: listByBuildingMachine?.data?.maintain_hour?.[0],
      hours: listByBuildingMachine?.data?.hours?.[0],
      run_rate: listByBuildingMachine?.data?.run_rate?.[0],
    },
  });

  const getSelectOption = useCallback(
    () => ({
      building: buildingOptions?.[0]?.key,
      machine_id: machineOptions?.[0]?.key,
      last_maintain_time: listByBuildingMachine?.data?.last_maintain_time[0],
      next_maintain_time: listByBuildingMachine?.data?.next_maintain_time[0],
      ...searchOption,
    }),
    [
      searchOption,
      buildingOptions,
      machineOptions,
      listByBuildingMachine?.data?.last_maintain_time,
      listByBuildingMachine?.data?.next_maintain_time,
    ]
  );

  const navigate = useNavigate();
  const getOptions = useCallback(
    (data) => ({
      ...getSelectOption(),
      ...data,
      ...(data.hours && { hours: trimNumber(data.hours) }),
      ...(data.maintain_cost && { maintain_cost: trimNumber(data.maintain_cost) }),
      ...(data.maintain_hour && { maintain_hour: trimNumber(data.maintain_hour) }),
      ...(data.run_rate && { run_rate: trimNumber(data.run_rate) }),
    }),
    [getSelectOption]
  );

  useEffect(() => {
    if (listByBuildingMachine) {
      startTransition(() => {
        setValue('hours', draftRef.current?.hours || listByBuildingMachine?.data?.hours?.[0] || '');
        setValue(
          'maintain_cost',
          draftRef.current?.maintain_cost || listByBuildingMachine?.data?.maintain_cost?.[0] || ''
        );

        setValue(
          'maintain_hour',
          draftRef.current?.maintain_hour || listByBuildingMachine?.data?.maintain_hour?.[0] || ''
        );

        setValue('run_rate', draftRef.current?.run_rate || listByBuildingMachine?.data?.run_rate?.[0] || '');
      });

      setSearchOption((prev) => ({
        ...prev,
        ...(!listByBuildingMachine?.data?.machine_id?.includes(prev.machine_id) && {
          machine_id: listByBuildingMachine?.data?.machine_id?.[0],
        }),
      }));
    }
  }, [listByBuildingMachine, draftRef, setValue]);

  return (
    <form onSubmit={handleSubmit((data) => navigate(getOptions(data)))}>
      <div className="flex flex-grow justify-center space-x-8">
        <div className="space-y-2 border-r-2 border-divider pr-8">
          <div className="font-medium">{t('airCompressorPage:estimatedDevice')}</div>
          <div className="flex space-x-2">
            <Select
              className="flex-col !items-start"
              splitter={null}
              buttonClassName="w-32"
              label={t('airCompressorPage:site')}
              options={buildingOptions}
              selected={buildingOptions?.find((option) => option.key === searchOption.building)}
              onChange={(e) => {
                draftRef.current = {};
                setSearchOption((prev) => ({ ...prev, building: e.key }));
              }}
            />
            <Select
              className="flex-col !items-start"
              splitter={null}
              buttonClassName="w-32"
              label={
                <div className="max-w-32">
                  <Ellipsis label={t('airCompressorPage:deviceNumber')} />
                </div>
              }
              options={machineOptions}
              selected={machineOptions?.find((option) => option.key === searchOption.machine_id)}
              onChange={(e) => {
                draftRef.current = {};
                setSearchOption((prev) => ({ ...prev, machine_id: e.key }));
              }}
            />
          </div>
        </div>
        <div className="space-y-2 border-r-2 border-divider pr-8">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <div className="font-medium">保養紀錄</div>
              <Dialog
                disabled
                render={({ close }) => {}}
                title="常用保養資訊"
                titleClassName="bg-primary-800 rounded-t py-2 px-4"
                className="max-w-7xl"
              >
                <div className="pointer-events-none cursor-pointer font-medium text-primary-600 underline">
                  常用保養資訊
                </div>
              </Dialog>
            </div>
            <div className="flex space-x-2">
              <div
                className="pointer-events-none cursor-pointer font-medium text-primary-600 underline"
                onClick={() => {}}
              >
                加入常用保養資訊
              </div>
              <div
                className="cursor-pointer text-gray-300 underline"
                onClick={() => {
                  navigate({}, { merge: false });
                  reset({ hours: '', maintain_cost: '', maintain_hour: '', run_rate: '' });
                }}
              >
                {t('airCompressorPage:clear')}
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <DatePicker
              showIcon
              className="h-9 w-40 rounded border border-gray-500 border-opacity-100 bg-transparent"
              label="上一次保養日期"
              placeholder="Type here"
              onChange={(e) => setSearchOption({ last_maintain_time: e })}
              {...((searchOption.last_maintain_time || listByBuildingMachine?.data?.last_maintain_time?.[0]) && {
                value: new Date(
                  searchOption.last_maintain_time || listByBuildingMachine?.data?.last_maintain_time?.[0]
                ),
              })}
            />
            <div className="flex items-end space-x-1">
              <Input
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent text-right"
                label="定保時數"
                placeholder="Type here"
                {...register('maintain_hour')}
              />
              <div>小時</div>
            </div>
            <div className="flex items-end space-x-1">
              <Input
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent text-right"
                label="單次保養費用"
                placeholder="Type here"
                {...register('maintain_cost')}
              />
              <div>RMB</div>
            </div>
            <div className="flex items-end space-x-1">
              <Input
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent text-right"
                label="保養後已運行時數"
                placeholder="Type here"
                {...register('hours')}
              />
              <div>小時</div>
            </div>
            <Input
              className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent text-right"
              label="運轉比例"
              placeholder="Type here"
              {...register('run_rate')}
            />
            <DatePicker
              showIcon
              className="h-9 w-40 rounded border border-gray-500 border-opacity-100 bg-transparent"
              label="預期保養日期"
              placeholder="Type here"
              onChange={(e) => setSearchOption({ next_maintain_time: e })}
              {...((searchOption.next_maintain_time || listByBuildingMachine?.data?.next_maintain_time?.[0]) && {
                value: new Date(
                  searchOption.next_maintain_time || listByBuildingMachine?.data?.next_maintain_time?.[0]
                ),
              })}
            />
          </div>
        </div>
        <Button type="submit" className="self-center">
          {t('airCompressorPage:calculate')}
        </Button>
        <Button className="self-center">Excel</Button>
      </div>
    </form>
  );
}
