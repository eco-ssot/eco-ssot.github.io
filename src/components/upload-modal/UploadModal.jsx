import { useEffect, useRef, useState } from 'react';

import { UploadIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import Button from '../button/Button';
import FileInput from '../input/FileInput';
import Modal from '../modal/Modal';

export default function UploadModal({ title, open, setOpen, uploadExcel, isSuccess }) {
  const { t } = useTranslation(['component']);
  const [name, setName] = useState('');
  const fileRef = useRef();
  useEffect(() => {
    !open && setName('');
  }, [open]);

  useEffect(() => {
    if (!!isSuccess) {
      toast.success(t('component:toast.uploadSuccess'));
      fileRef.current = null;
      setOpen(false);
    }
  }, [isSuccess, setOpen, t]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={title}
      footer={
        <Button
          className="mb-8"
          onClick={() => {
            if (isNil(fileRef.current)) {
              return;
            }

            const formData = new FormData();
            formData.append('file', fileRef.current);
            uploadExcel(formData);
          }}>
          <UploadIcon className="w-5 h-5 mr-2" />
          Import
        </Button>
      }>
      <form className="p-8 flex flex-col items-start space-y-4">
        <div>{t('component:upload.selectExcel')}</div>
        <div className="flex items-center space-x-4 w-full">
          <FileInput
            id="excel"
            type="file"
            value={name}
            onChange={(e) => {
              const file = Array.from(e.target.files)[0];
              fileRef.current = file;
              setName(e.target.value);
            }}
            accept=".xlsx,xls"
          />
          <label htmlFor="excel" className="underline cursor-pointer">
            Browse
          </label>
        </div>
      </form>
    </Modal>
  );
}
