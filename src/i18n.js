import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';

// Guards typeof : ce module est aussi chargé lors du prérendu Node (pas de localStorage/document)
const storedLang =
  typeof localStorage !== 'undefined' ? localStorage.getItem('atp-lang') : null;

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: storedLang || 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  if (typeof localStorage !== 'undefined') localStorage.setItem('atp-lang', lng);
  if (typeof document !== 'undefined') document.documentElement.lang = lng;
});

export default i18n;
