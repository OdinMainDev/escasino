import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '@/app/assets/locales/en/translation.json';
import translationRU from '@/app/assets/locales/ru/translation.json';
import rulesTranslations from '@/app/assets/locales/ru/rulesTranslations.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: {
      ...translationRU,
      ...rulesTranslations,
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
