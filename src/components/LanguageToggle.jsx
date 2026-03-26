import { useTranslation } from 'react-i18next';
import './LanguageToggle.css';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggle = () => {
    i18n.changeLanguage(currentLang === 'fr' ? 'en' : 'fr');
  };

  return (
    <button className="lang-toggle" onClick={toggle} aria-label="Switch language">
      <span className={currentLang === 'fr' ? 'active' : ''}>FR</span>
      <span className="lang-toggle__separator">/</span>
      <span className={currentLang === 'en' ? 'active' : ''}>EN</span>
    </button>
  );
}
