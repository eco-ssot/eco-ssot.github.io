import { useMemo } from 'react';

import clsx from 'clsx';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as PdfIcon } from '../../../public/icons/file-pdf-solid.svg';
import version from '../../../version.json';
import APP_CONSTANTS from '../../app/appConstants';
import { useKeycloak } from '../../keycloak';
import { selectBusiness, selectLanguage, selectP, selectS } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import { useGetPlantOptionsQuery } from '../../services/management';
import Avatar from '../avatar/Avatar';
import Divider from '../divider/Divider';
import NavBar from '../nav-bar/NavBar';
import GhostSelect from '../select/GhostSelect';
import GroupSelect from '../select/GroupSelect';

export default function Header({ className }) {
  const { t } = useTranslation(['common']);
  const { keycloak } = useKeycloak();
  const lng = useSelector(selectLanguage);
  const business = useSelector(selectBusiness);
  const site = useSelector(selectS);
  const plant = useSelector(selectP);
  const { data } = useGetPlantOptionsQuery({ bo: business }, { skip: !keycloak?.authenticated });
  const sitePlantOptions = useMemo(() => {
    const grouped = groupBy(data, ({ key }) => key.split(/-|_/)[0]);
    return Object.entries(grouped).reduce(
      (prev, [site, values]) => {
        const siteOption = { key: site, value: site, group: true };
        if (values.length === 1) {
          if (values[0].key === site) {
            return prev.concat(siteOption);
          }

          return prev.concat(siteOption, { ...values[0], parent: site });
        }

        return prev.concat([siteOption, ...values.map((value) => ({ ...value, parent: site }))]);
      },
      [{ key: 'ALL', value: 'ALL', alias: 'Sites / Plants', group: true }]
    );
  }, [data]);

  return (
    <div className={clsx('flex px-4 bg-primary-800 shadow-lg items-center z-10', className)}>
      <Link className="flex items-center space-x-4" to="/">
        <img className="h-10 w-10" src="/logo-64x64.png" alt="logo" />
        <div className="block truncate font-medium text-xl">{t('title')}</div>
        <div className="block truncate text-unit text-sm">
          Ver {Object.keys(version).sort((a, b) => b.localeCompare(a))[0]}
        </div>
      </Link>
      <Divider className="h-1/2" />
      {keycloak?.authenticated ? (
        <>
          <GhostSelect
            className="w-28"
            options={APP_CONSTANTS.BUSINESS_OPTIONS}
            onChange={(e) => navigate({ ...e, s: null, p: null })}
            selected={APP_CONSTANTS.BUSINESS_OPTIONS.find((option) => option.key === business)}
            queryKey="business"
          />
          <Divider className="h-1/2" />
          <GroupSelect
            buttonClassName="w-42"
            options={sitePlantOptions}
            onChange={navigate}
            selected={
              sitePlantOptions.find((option) => option.key === plant) ||
              sitePlantOptions.find((option) => option.key === site)
            }
            parentKey="s"
            childKey="p"
          />
          <Divider className="h-1/2" />
          <NavBar />
          <Divider className="h-1/2" />
          <div className="tooltip tooltip-left tooltip-bg-primary-900" data-tip="系統說明手冊">
            <a href="/ECO系統說明手冊_1.1.4.pdf" target="_blank">
              <PdfIcon className="w-5 h-5 fill-gray-50" />
            </a>
          </div>
          <Divider className="h-1/2" />
        </>
      ) : (
        <>
          <div className="flex-grow"></div>
          <Divider className="h-1/2" />
        </>
      )}
      <GhostSelect
        className="w-30"
        options={APP_CONSTANTS.LANGUAGE_OPTIONS}
        selected={APP_CONSTANTS.LANGUAGE_OPTIONS.find((option) => lng?.startsWith(option.key))}
        onChange={navigate}
        queryKey="lng"
      />
      <Divider className="h-1/2" />
      {keycloak?.authenticated ? <Avatar>{keycloak?.idTokenParsed?.given_name}</Avatar> : <div>Login</div>}
    </div>
  );
}
