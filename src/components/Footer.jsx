import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {year} Air Tricks Prod. {t('footer.rights')}
        </p>
        <Link to="/legal" className="footer__legal">{t('footer.legal')}</Link>
        <p className="footer__credit">
          {t('footer.made_with')} <strong>Guillaume Etienne</strong>
        </p>
      </div>
    </footer>
  );
}
