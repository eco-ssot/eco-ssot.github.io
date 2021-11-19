import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectLanguage } from '../location/locationSlice';

export default function Language() {
  const lng = useSelector(selectLanguage);
  const { i18n } = useTranslation();
  useEffect(() => lng && i18n.changeLanguage(lng), [i18n, lng]);
  return null;
}
