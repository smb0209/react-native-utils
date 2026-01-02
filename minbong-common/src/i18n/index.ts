import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from '@/i18n/locales/en.json';
import ko from '@/i18n/locales/ko.json';
import ja from '@/i18n/locales/ja.json';

import { getMeta, setMeta } from '@/db/repositories/appMetaRepository';

// language for device
const locales = RNLocalize.getLocales();
const deviceLanguage = locales[0]?.languageCode || 'en';

i18n
  .use(initReactI18next)
  .init({
    lng: deviceLanguage,
    fallbackLng: 'en',
    resources: {
      en: {translation: en},
      ko: {translation: ko},
      ja: {translation: ja},
    },
    interpolation: {
      escapeValue: false,
    },
  });


(async () => {
  try {
    const savedLang = await getMeta('appLanguage');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  } catch (e) {
    console.warn('Failed to load saved language', e);
  }
})();

export const setLanguage = async (lang: string) => {
  i18n.changeLanguage(lang);
  await setMeta('appLanguage', lang);
};

export default i18n;
