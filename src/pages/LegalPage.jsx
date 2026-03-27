import { useTranslation } from 'react-i18next';
import './LegalPage.css';

export default function LegalPage() {
  const { t } = useTranslation();

  return (
    <main className="legal-page">
      <div className="legal-page__container">
        <h1 className="legal-page__title">{t('legal.title')}</h1>

        {/* ── Mentions légales ── */}
        <section className="legal-page__section">
          <h2 className="legal-page__h2">{t('legal.mentions_title')}</h2>

          <h3 className="legal-page__h3">{t('legal.publisher')}</h3>
          <p>Guillaume Etienne</p>
          <p>Auto-entrepreneur — SIRET : 534 705 876 00033</p>
          <p>165, chemin des érables<br />01600 Saint Bernard</p>
          <p>Tél. : 06 51 79 05 40</p>
          <p>Email : <a href="mailto:contact@airtricksprod.fr" className="legal-page__link">contact@airtricksprod.fr</a></p>

          <h3 className="legal-page__h3">{t('legal.host')}</h3>
          <p>Vercel Inc.</p>
          <p>440 N Barranca Ave #4133<br />Covina, CA 91723 — États-Unis</p>
          <p>Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="legal-page__link">vercel.com</a></p>
        </section>

        {/* ── Politique de confidentialité ── */}
        <section className="legal-page__section">
          <h2 className="legal-page__h2">{t('legal.privacy_title')}</h2>

          <h3 className="legal-page__h3">{t('legal.data_collected')}</h3>
          <p>
            Dans le cadre du formulaire de contact, les données suivantes sont collectées :
            nom, adresse email, message. Ces informations sont communiquées librement par l'utilisateur.
          </p>
          <p>
            Aucun cookie tiers, outil de suivi analytique ou traceur publicitaire n'est utilisé sur ce site.
          </p>

          <h3 className="legal-page__h3">{t('legal.data_purpose')}</h3>
          <p>
            Les données collectées ont pour unique finalité de répondre aux demandes de contact
            et/ou de devis. Elles ne sont ni revendues, ni transmises à des tiers.
          </p>

          <h3 className="legal-page__h3">{t('legal.data_retention')}</h3>
          <p>
            Les données sont conservées pendant une durée maximale de 3 ans à compter du
            dernier contact.
          </p>

          <h3 className="legal-page__h3">{t('legal.data_rights')}</h3>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679)
            et à la loi Informatique et Libertés, vous disposez des droits suivants :
          </p>
          <ul className="legal-page__list">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (droit à l'oubli)</li>
            <li>Droit d'opposition au traitement</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez : <a href="mailto:contact@airtricksprod.fr" className="legal-page__link">contact@airtricksprod.fr</a>
          </p>
          <p>
            En cas de litige, vous pouvez introduire une réclamation auprès de la CNIL
            (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="legal-page__link">www.cnil.fr</a>).
          </p>

          <h3 className="legal-page__h3">{t('legal.responsibility')}</h3>
          <p>
            Guillaume Etienne s'efforce de maintenir les informations de ce site à jour et exactes.
            La responsabilité du site ne peut être engagée en cas d'inexactitude ou d'omission
            des informations publiées.
          </p>
        </section>

        <p className="legal-page__updated">
          {t('legal.updated')} : mars 2026
        </p>
      </div>
    </main>
  );
}
