import { useCallback, useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '../../components/button/Button';
import Dialog from '../../components/dialog/Dialog';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import useNavigate from '../../router/useNavigate';
import { useGetAirCompressListQuery, usePostSpecMutation } from '../../services/airCompressor';
import { trimNumber } from '../../utils/number';

import SpecTable from './SpecTable';

export default function AirCompressorForm({ query }) {
  const [searchOption, setSearchOption] = useState(query);
  const { data: list } = useGetAirCompressListQuery();
  const { data: listByBuilding } = useGetAirCompressListQuery(
    { building: searchOption.building || list?.building?.[0] },
    { skip: !list?.building }
  );

  const buildingOptions = useMemo(
    () => list?.building?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [list?.building]
  );

  const machineOptions = useMemo(
    () => listByBuilding?.machines?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [listByBuilding?.machines]
  );

  const oilOptions = useMemo(
    () => listByBuilding?.oil_type?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [listByBuilding?.oil_type]
  );

  const compressOptions = useMemo(
    () => listByBuilding?.compress_type?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [listByBuilding?.compress_type]
  );

  const runOptions = useMemo(
    () => listByBuilding?.run_type?.filter(Boolean)?.map((val) => ({ key: val, value: val })),
    [listByBuilding?.run_type]
  );

  const { register, handleSubmit, setValue, reset, getValues } = useForm({
    defaultValues: {
      maintenance: listByBuilding?.maintenance,
      power: listByBuilding?.power,
      engine_depcmemt: listByBuilding?.engine_depcmemt,
      eer_r: listByBuilding?.eer_r,
      cost: listByBuilding?.cost,
      model_number: listByBuilding?.model_number,
    },
  });

  const getSelectOption = useCallback(
    () => ({
      building: buildingOptions?.[0]?.key,
      machine: machineOptions?.[0]?.key,
      oil_type: oilOptions?.[0]?.key,
      compress_type: compressOptions?.[0]?.key,
      run_type: runOptions?.[0]?.key,
      ...searchOption,
    }),
    [searchOption, buildingOptions, machineOptions, oilOptions, compressOptions, runOptions]
  );

  const navigate = useNavigate();
  const getOptions = useCallback(
    (data) => ({
      ...getSelectOption(),
      ...data,
      ...(data.maintenance && { maintenance: trimNumber(data.maintenance) }),
      ...(data.power && { power: trimNumber(data.power) }),
      ...(data.engine_depcmemt && { maintenance: trimNumber(data.engine_depcmemt) }),
      ...(data.eer_r && { maintenance: trimNumber(data.eer_r) }),
      ...(data.cost && { maintenance: trimNumber(data.cost) }),
    }),
    [getSelectOption]
  );

  const [postSpec] = usePostSpecMutation();
  useEffect(() => {
    setValue('maintenance', listByBuilding?.maintenance || '');
    setValue('power', listByBuilding?.power || '');
    setValue('engine_depcmemt', listByBuilding?.engine_depcmemt || '');
    setValue('eer_r', listByBuilding?.eer_r || '');
    setValue('cost', listByBuilding?.cost || '');
    setValue('model_number', listByBuilding?.maintenance || '');
    setSearchOption((prev) => ({
      ...prev,
      building: listByBuilding?.building?.[0],
      machine: listByBuilding?.machines?.[0],
      compress_type: listByBuilding?.compress_type?.[0],
      oil_type: listByBuilding?.oil_type?.[0],
      run_type: listByBuilding?.run_type?.[0],
    }));
  }, [listByBuilding, setValue]);

  return (
    <form
      className={clsx('rounded bg-primary-900 p-4 shadow')}
      onSubmit={handleSubmit((data) => navigate(getOptions(data)))}>
      <div className="mb-4 text-xl font-medium">空壓設備智能推薦</div>
      <div className="flex flex-grow justify-center space-x-8">
        <div className="space-y-2 border-r-2 border-divider pr-8">
          <div className="font-medium">欲評估設備</div>
          <div className="flex space-x-2">
            <Select
              className="flex-col !items-start"
              splitter={null}
              buttonClassName="w-32"
              label="廠區資訊"
              options={buildingOptions}
              selected={buildingOptions?.find((option) => option.key === searchOption.building)}
              onChange={(e) => setSearchOption((prev) => ({ ...prev, building: e.key }))}
            />
            <Select
              className="flex-col !items-start"
              splitter={null}
              buttonClassName="w-32"
              label="設備編號"
              options={machineOptions}
              selected={machineOptions?.find((option) => option.key === searchOption.machine)}
              onChange={(e) => setSearchOption((prev) => ({ ...prev, machine: e.key }))}
            />
            <div className="flex items-end space-x-1">
              <Input
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent text-right"
                label="保養成本"
                placeholder="非必填"
                defaultValue={listByBuilding?.maintenance}
                {...register('maintenance')}
              />
              <div className="-translate-y-1 text-gray-300">萬元</div>
            </div>
          </div>
        </div>
        <div className="space-y-2 border-r-2 border-divider pr-8">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <div className="font-medium">新機台規格</div>
              <Dialog
                render={({ close }) => (
                  <SpecTable
                    close={close}
                    onApply={(e) => {
                      setValue('maintenance', e?.maintenance || '');
                      setValue('power', e?.power || '');
                      setValue('engine_depcmemt', e?.engine_depcmemt || '');
                      setValue('eer_r', e?.eer_r || '');
                      setValue('cost', e?.cost || '');
                      setValue('model_number', e?.maintenance || '');
                      setSearchOption((prev) => ({
                        ...prev,
                        ...(compressOptions?.find((option) => option.key === e?.compress_type) && {
                          compress_type: e?.compress_type,
                        }),
                        ...(oilOptions?.find((option) => option.key === e?.oil_type) && {
                          oil_type: e?.oil_type,
                        }),
                        ...(runOptions?.find((option) => option.key === e?.run_type) && {
                          run_type: e?.run_type,
                        }),
                      }));
                    }}
                  />
                )}
                title="常用新機台規格"
                titleClassName="bg-primary-800 rounded-t py-2 px-4"
                className="max-w-7xl">
                <div className="cursor-pointer font-medium text-primary-600 underline">常用規格</div>
              </Dialog>
            </div>
            <div className="flex space-x-2">
              <div
                className="cursor-pointer font-medium text-primary-600 underline"
                onClick={() => {
                  const payload = getOptions(getValues());
                  postSpec(payload).then((res) => {
                    if (!res.error) {
                      toast.success('Success');
                    }
                  });
                }}>
                加入常用規格
              </div>
              <div
                className="cursor-pointer text-gray-300 underline"
                onClick={() => {
                  navigate({}, { merge: false });
                  reset({ cost: '', eer_r: '', engine_depcmemt: '', maintenance: '', model_number: '', power: '' });
                }}>
                清除
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Select
              className="flex-col !items-start"
              splitter={null}
              buttonClassName="w-32"
              label="潤滑類型"
              options={oilOptions}
              selected={oilOptions?.find((option) => option.key === searchOption.oil_type)}
              onChange={(e) => setSearchOption((prev) => ({ ...prev, oil_type: e.key }))}
            />
            <Select
              className="flex-col !items-start"
              splitter={null}
              buttonClassName="w-32"
              label="壓縮類型"
              options={compressOptions}
              selected={compressOptions?.find((option) => option.key === searchOption.compress_type)}
              onChange={(e) => setSearchOption((prev) => ({ ...prev, compress_type: e.key }))}
            />
            <Select
              className="flex-col !items-start"
              splitter={null}
              buttonClassName="w-32"
              label="運轉類型"
              options={runOptions}
              selected={runOptions?.find((option) => option.key === searchOption.run_type)}
              onChange={(e) => setSearchOption((prev) => ({ ...prev, run_type: e.key }))}
            />
            <Input
              required
              className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent text-right"
              label="額定功率"
              placeholder="Type here"
              defaultValue={listByBuilding?.power}
              {...register('power', { required: true })}
            />
            <Input
              required
              className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent text-right"
              label="額定排氣量"
              placeholder="Type here"
              defaultValue={listByBuilding?.engine_depcmemt}
              {...register('engine_depcmemt', { required: true })}
            />
            <Input
              required
              className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent text-right"
              label="額定能效"
              placeholder="Type here"
              defaultValue={listByBuilding?.eer_r}
              {...register('eer_r', { required: true })}
            />
            <Input
              required
              className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent text-right"
              label="購置新機費用"
              placeholder="Type here"
              defaultValue={listByBuilding?.cost}
              {...register('cost', { required: true })}
            />
            <Input
              className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent text-right"
              label="品牌 / 型號"
              placeholder="非必填"
              defaultValue={listByBuilding?.model_number}
              {...register('model_number')}
            />
          </div>
        </div>
        <Button type="submit" className="self-center" onClick={() => {}}>
          計算能效
        </Button>
      </div>
    </form>
  );
}
