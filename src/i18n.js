import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { initReactI18next } from 'react-i18next';

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(ChainedBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: ['en', 'zh'],
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      backends: [...(process.env.NODE_ENV === 'production' ? [LocalStorageBackend] : []), HttpBackend],
      backendOptions: [
        ...(process.env.NODE_ENV === 'production'
          ? [
              {
                expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
                defaultVersion: '1.0.7',
              },
            ]
          : []),
        {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
      ],
    },
  });

export default i18n;
