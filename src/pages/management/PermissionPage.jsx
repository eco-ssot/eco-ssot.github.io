import { useCallback, useMemo, useState, useEffect } from 'react';

import { UserAddIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import Button from '../../components/button/Button';
import Dialog from '../../components/dialog/Dialog';
import AdSearchSelect from '../../components/select/AdSearchSelect';
import BaseReactSelect from '../../components/select/BaseReactSelect';
import Table from '../../components/table/Table';
import Toggle from '../../components/toggle/Toggle';
import useAdmin from '../../hooks/useAdmin';
import { useDeleteUserMutation, useGetUserListQuery, usePostUserMutation } from '../../services/auth';

const COLUMNS = [
  { Header: 'Name', accessor: 'first_name' },
  { Header: 'Email', accessor: 'email' },
];

const ROLES = [
  { label: 'normal', value: 'normal', isFixed: true },
  { label: 'p8', value: 'p8' },
  { label: 'management', value: 'management' },
  { label: 'dev', value: 'dev' },
];

function UserForm({ users }) {
  const { canEdit } = useAdmin();
  const [user, setUser] = useState(null);
  const getUser = useCallback((email) => users?.find((d) => d.email === email), [users]);
  const userOptions = useMemo(() => users?.slice(0, 10)?.map((d) => ({ value: d.id, label: d.email })), [users]);
  const [selectedRoles, setSelectedRoes] = useState(ROLES.slice(0, 1));
  const [postUser] = usePostUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const afterClose = useCallback(() => {
    setUser(null);
    setSelectedRoes(ROLES.slice(0, 1));
  }, []);

  useEffect(() => {
    const targetUser = getUser(user?.label);
    const roles = targetUser ? ROLES.filter((role) => targetUser.roles.includes(role.label)) : ROLES.slice(0, 1);
    setSelectedRoes(roles);
  }, [user?.label, getUser]);

  return (
    <Dialog
      disableClose
      disabled={!canEdit}
      afterClose={afterClose}
      render={({ close }) => (
        <>
          <div className="flex h-full flex-col space-y-4 rounded-b bg-primary-900 p-8 shadow">
            <div className="flex items-center">
              <div className="min-w-32">
                Email :{' '}
                {user && !getUser(user?.label) && (
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800">
                    New
                  </span>
                )}
              </div>
              <AdSearchSelect
                isClearable
                className="w-full"
                placeholder="Type to search"
                onChange={setUser}
                defaultOptions={userOptions}
                value={user}
              />
            </div>
            <div className="flex items-center">
              <div className="min-w-32">Roles : </div>
              <BaseReactSelect
                isMulti
                className="w-full"
                placeholder="Select roles"
                options={ROLES}
                closeMenuOnSelect={false}
                onSelectResetsInput={false}
                onChange={setSelectedRoes}
                isClearable={false}
                value={selectedRoles}
              />
            </div>
            <div className="flex flex-grow flex-col justify-end">
              <div className="flex justify-end space-x-4">
                <Button
                  variant="danger"
                  onClick={() => {
                    const userId = getUser(user?.label)?.id;
                    if (userId) {
                      deleteUser(userId).then((res) => {
                        if (!res.error) {
                          toast.success('Success');
                          afterClose();
                        }
                      });
                    }
                  }}
                  className={!getUser(user?.label) && 'pointer-events-none opacity-50'}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    const target = getUser(user?.label);
                    const payload = {
                      username: target?.username || '',
                      first_name: user?.alias,
                      last_name: user?.surname,
                      email: user?.label,
                      permission_types: selectedRoles.map((d) => d.label),
                    };

                    if (target) {
                      deleteUser(target.id).then((res) => {
                        if (!res.error) {
                          postUser(payload).then((_res) => {
                            if (!_res.error) {
                              toast.success('Success');
                              afterClose();
                            }
                          });
                        }
                      });
                    } else {
                      postUser(payload).then((res) => {
                        if (!res.error) {
                          toast.success('Success');
                          afterClose();
                        }
                      });
                    }
                  }}
                  className={
                    (!user ||
                      getUser(user?.label)?.roles?.slice()?.sort()?.join() ===
                        selectedRoles
                          .map((role) => role.label)
                          .sort()
                          .join()) &&
                    'pointer-events-none opacity-50'
                  }
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      title="Add/Edit User"
      className="h-64 max-w-2xl"
      titleClassName="bg-primary-800 px-4 py-2 rounded-t"
    >
      <Button className={clsx('space-x-1', !canEdit && 'pointer-events-none opacity-50')}>
        <UserAddIcon className="h-5 w-5" />
        <div>Add/Edit User</div>
      </Button>
    </Dialog>
  );
}

export default function PermissionPage() {
  const { t } = useTranslation(['managementPage']);
  const [max, setMax] = useState(10);
  const { data } = useGetUserListQuery();
  const columns = useMemo(() => COLUMNS, []);
  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col rounded bg-primary-900 p-4 shadow">
        <div className="flex items-center justify-between">
          <div className="mb-6 text-xl font-medium">{t('managementPage:permission.permissionList')}</div>
          <UserForm users={data?.data} />
        </div>
        <div className="grid flex-grow grid-cols-2 grid-rows-2 gap-8 overflow-auto">
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">
              {t('managementPage:permission.checkingPermissionListOfSiteP8Data')}
            </div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              {data && <Table columns={columns} data={data.p8} />}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">{t('managementPage:permission.editingPermissionListOfSettings')}</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              {data && <Table columns={columns} data={data.management} />}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">{t('managementPage:permission.listOfDevelopmentTeam')}</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              {data && <Table columns={columns} data={data.dev} />}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">{t('managementPage:permission.userList')}</div>
              <div className="flex space-x-4">
                <Toggle label={t('common:showAll')} onChange={(e) => (e ? setMax(1000) : setMax(10))} />
              </div>
            </div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              {data && <Table columns={columns} data={data.normal?.slice(0, max)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
