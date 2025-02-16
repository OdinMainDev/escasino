import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationZH from '@/app/assets/locales/zh/translation.json';
import translationEN from '@/app/assets/locales/en/translation.json';
import translationRU from '@/app/assets/locales/ru/translation.json';

import countriesTranslationsRU from '@/app/assets/locales/ru/countriesTranslations.json';
import countriesTranslationsEN from '@/app/assets/locales/en/countriesTranslations.json';
import countriesTranslationsZH from '@/app/assets/locales/zh/countriesTranslations.json';

import rulesTranslationsRU from '@/app/assets/locales/ru/rulesTranslations.json';

const resources = {
  zh: {
    translation: {
      ...translationZH,
      ...countriesTranslationsZH,
    },
  },
  en: {
    translation: {
      ...translationEN,
      ...countriesTranslationsEN,
    },
  },
  ru: {
    translation: {
      ...translationRU,
      ...rulesTranslationsRU,
      ...countriesTranslationsRU,
    },
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
