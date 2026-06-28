import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './FaqPage.css';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien coûte un site vitrine ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Un site vitrine simple (4 à 5 pages) démarre autour de 800 à 1 500 €. Un projet plus élaboré ou une refonte est devisé sur mesure. La prestation comprend toujours le design, le développement, l\'hébergement (1 an), le nom de domaine et le déploiement.' },
    },
    {
      '@type': 'Question',
      name: 'Quel est le délai de réalisation ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Comptez 3 à 5 semaines pour un site vitrine standard. Je travaille par itérations : maquette → validation → développement → mise en ligne.' },
    },
    {
      '@type': 'Question',
      name: 'Vous vous occupez aussi du domaine, de l\'hébergement et des emails ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, prestation clé en main : nom de domaine, hébergement, certificat SSL, adresses email professionnelles et déploiement continu. Un seul interlocuteur pour tout.' },
    },
    {
      '@type': 'Question',
      name: 'Qui sont vos clients ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Artisans, commerçants, restaurants, associations, professions libérales, TPE et PME de tous secteurs partout en France.' },
    },
    {
      '@type': 'Question',
      name: 'Vous travaillez à distance ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, entièrement à distance, partout en France. Brief par visio, échanges par email et validation sur lien de préproduction.' },
    },
    {
      '@type': 'Question',
      name: 'Comment se déroule un projet concrètement ?',
      acceptedAnswer: { '@type': 'Answer', text: 'En 6 étapes : Brief → Design → Développement → Recettage → Mise en ligne → Suivi post-lancement.' },
    },
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que le SEO ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Le SEO (Search Engine Optimization) regroupe les techniques pour améliorer le positionnement d\'un site sur Google : structure du code, vitesse, balises méta, contenu optimisé et liens entrants.' },
    },
    {
      '@type': 'Question',
      name: 'C\'est quoi le GEO (Generative Engine Optimization) ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Le GEO est le SEO des intelligences artificielles. L\'objectif est d\'être cité par ChatGPT, Claude ou Perplexity via des données structurées Schema.org, un fichier llms.txt et une architecture de contenu orientée réponses.' },
    },
    {
      '@type': 'Question',
      name: 'Que se passe-t-il après la mise en ligne ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Je reste disponible pour les ajustements post-lancement et propose un suivi maintenance : mises à jour, corrections, évolutions. Un contrat mensuel peut être mis en place.' },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi choisir un développeur plutôt que Wix ou Squarespace ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Les constructeurs de sites livrent du générique : templates identiques, performances limitées et dépendance à la plateforme. Un développeur livre un site unique, performant et que vous possédez entièrement.' },
    },
  ],
};

export default function FaqPage() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const items = t('faq.items', { returnObjects: true });

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main className="faq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="faq-page__container">
        <h1 className="faq-page__title">{t('faq.title')}</h1>
        <p className="faq-page__subtitle">{t('faq.subtitle')}</p>

        <div className="faq-page__list">
          {Array.isArray(items) && items.map((item, i) => (
            <div key={i} className={`faq-item${openIndex === i ? ' faq-item--open' : ''}`}>
              <button className="faq-item__button" onClick={() => toggle(i)}>
                {item.q}
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__answer">
                <div className="faq-item__answer-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
