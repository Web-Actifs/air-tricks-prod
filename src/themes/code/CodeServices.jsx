import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STACK_ITEMS = [
  'HTML5', 'CSS3/Sass', 'JavaScript', 'React', 'Vite',
  'Framer Motion', 'Tailwind', 'Astro.js', 'Node.js', 'Git',
  'Figma', 'Premiere Pro', 'Responsive', 'SEO',
];

const SERVICES = [
  { key: 'web_creation', file: 'web-creation.jsx' },
  { key: 'integration',  file: 'integration.jsx'  },
  { key: 'redesign',     file: 'redesign.jsx'     },
  { key: 'maintenance',  file: 'maintenance.jsx'  },
  { key: 'optimization', file: 'optimization.jsx' },
];

const TIMELINE_STEPS = [
  { key: 'brief',    ai: false },
  { key: 'design',   ai: false },
  { key: 'dev',      ai: true  },
  { key: 'infra',    ai: false },
  { key: 'seo_step', ai: true  },
  { key: 'support',  ai: true  },
];

function Dots() {
  return (
    <>
      <span className="code-services__card-dot code-services__card-dot--red" />
      <span className="code-services__card-dot code-services__card-dot--yellow" />
      <span className="code-services__card-dot code-services__card-dot--green" />
    </>
  );
}

export default function CodeServices() {
  const { t } = useTranslation();

  const ownershipItems = t('services.ownership_items').split(/\s*·\s*/);
  const aiLine = t('services.terminal_ai');
  const aiParts = aiLine.split('Claude Code');

  const outputLines = [
    { delay: 0.5,  cls: 'muted',   node: <>{t('services.terminal_loading')}</> },
    { delay: 0.95, cls: 'success', node: <>{t('services.terminal_services')}</> },
    { delay: 1.4,  cls: 'info',    node: <>{aiParts[0]}<span className="code-services__manifest-hl">Claude Code</span>{aiParts[1]}</> },
    { delay: 1.85, cls: 'info',    node: <>{t('services.terminal_infra')}</> },
    { delay: 2.3,  cls: 'success', node: <>{t('services.terminal_status')}</> },
  ];

  return (
    <section className="code-services section" id="services">

      {/* ── Terminal manifest ── */}
      <motion.div
        className="code-services__manifest"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <div className="code-services__manifest-bar">
          <Dots />
          <span className="code-services__manifest-title">guillaume@airtricks ~ %</span>
        </div>
        <div className="code-services__manifest-body">
          <div className="code-services__manifest-cmd">
            <span className="code-services__manifest-prompt">$</span>
            <span className="code-services__manifest-cmd-text">
              ./services.sh --full-stack --ai-augmented --from-brief-to-live
            </span>
          </div>
          {outputLines.map(({ delay, cls, node }, i) => (
            <motion.div
              key={i}
              className={`code-services__manifest-line code-services__manifest-line--${cls}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay, duration: 0.25 }}
            >
              {node}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Header ── */}
      <div className="code-services__header">
        <h2 className="code-services__title">
          <span className="code-services__comment">{'// '}</span>
          {t('services.title')}
        </h2>
        <p className="code-services__subtitle">{t('services.subtitle')}</p>
      </div>

      {/* ── Service cards (code file style) ── */}
      <div className="code-services__grid">
        {SERVICES.map(({ key, file }, i) => (
          <motion.div
            key={key}
            className="code-services__card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="code-services__card-header">
              <Dots />
              <span className="code-services__card-filename">{file}</span>
              <span className="code-services__card-ai-badge">[AI]</span>
            </div>
            <div className="code-services__card-body">
              <div className="code-services__card-line">
                <span className="code-services__card-linenum">1</span>
                <span className="code-services__card-code">
                  <span className="code-services__card-keyword">function </span>
                  <span className="code-services__card-func">{t(`services.${key}`)}</span>
                  <span className="code-services__card-comment">{'() {'}</span>
                </span>
              </div>
              <div className="code-services__card-line">
                <span className="code-services__card-linenum">2</span>
                <span className="code-services__card-code">
                  <span className="code-services__card-comment">{'  // '}{t(`services.${key}_desc`)}</span>
                </span>
              </div>
              <div className="code-services__card-line">
                <span className="code-services__card-linenum">3</span>
                <span className="code-services__card-code">{'}'}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Process A→Z pipeline ── */}
      <motion.div
        className="code-services__pipeline"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="code-services__card-header">
          <Dots />
          <span className="code-services__card-filename">de-a-a-z.sh</span>
        </div>
        <div className="code-services__pipeline-body">
          <div className="code-services__manifest-cmd">
            <span className="code-services__manifest-prompt">$</span>
            <span className="code-services__manifest-cmd-text">./projet.sh --brief-to-live</span>
          </div>
          <p className="code-services__pipeline-sub">{t('services.az_sub')}</p>
          {TIMELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.key}
              className="code-services__pipeline-step"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.25 }}
            >
              <span className="code-services__pipeline-stepnum">[{i + 1}/6]</span>
              <span className="code-services__pipeline-steptitle">{t(`services.step_${step.key}`)}</span>
              <span className="code-services__pipeline-stepdesc">{t(`services.step_${step.key}_desc`)}</span>
              {step.ai && <span className="code-services__card-ai-badge">[AI]</span>}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Pricing terminal ── */}
      <motion.div
        className="code-services__pricing"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="code-services__card-header">
          <Dots />
          <span className="code-services__card-filename">tarifs.sh</span>
        </div>
        <div className="code-services__pricing-body">
          <p className="code-services__pricing-cmd">
            <span className="code-services__manifest-prompt">$</span> ./devis --gratuit
          </p>
          <p className="code-services__pricing-text">{t('services.pricing_text')}</p>
          <p className="code-services__pricing-sub">{t('services.pricing_sub')}</p>
          <Link to="/contact" className="code-hero__btn code-hero__btn--primary">
            <span className="code-hero__btn-prefix">$</span> {t('services.pricing_cta')}
          </Link>
        </div>
      </motion.div>

      {/* ── AI + infrastructure cards ── */}
      <div className="code-services__infra">
        <motion.div
          className="code-services__infra-card code-services__infra-card--ai"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="code-services__card-header">
            <Dots />
            <span className="code-services__card-filename">ai-workflow.config.js</span>
          </div>
          <div className="code-services__card-body">
            <div className="code-services__card-line">
              <span className="code-services__card-linenum">1</span>
              <span className="code-services__card-code">
                <span className="code-services__card-comment">{'// co-pilote IA'}</span>
              </span>
            </div>
            <div className="code-services__card-line">
              <span className="code-services__card-linenum">2</span>
              <span className="code-services__card-code">
                <span className="code-services__card-keyword">const </span>
                <span className="code-services__card-func">copilot</span>
                <span> = </span>
                <span className="code-services__card-string">"Claude Code"</span>
              </span>
            </div>
          </div>
          <p className="code-services__card-desc">{t('services.ai_desc')}</p>
        </motion.div>

        <motion.div
          className="code-services__infra-card code-services__infra-card--az"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="code-services__card-header">
            <Dots />
            <span className="code-services__card-filename">infrastructure.json</span>
          </div>
          <div className="code-services__card-body">
            <div className="code-services__card-line">
              <span className="code-services__card-linenum">1</span>
              <span className="code-services__card-code">
                <span className="code-services__card-comment">{'// de A à Z'}</span>
              </span>
            </div>
            <div className="code-services__card-line">
              <span className="code-services__card-linenum">2</span>
              <span className="code-services__card-code">
                <span className="code-services__card-keyword">const </span>
                <span className="code-services__card-func">ownership</span>
                <span> = </span>
                <span className="code-services__card-string">"total"</span>
              </span>
            </div>
          </div>
          <p className="code-services__card-desc">{t('services.az_sub')}</p>
          <ul className="code-services__ownership">
            {ownershipItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ── Stack ── */}
      <div className="code-services__stack">
        <h3 className="code-services__stack-title">{'> '}{t('services.stack_title')}</h3>
        <div className="code-services__stack-grid">
          {STACK_ITEMS.map((tech) => (
            <span key={tech} className="code-services__stack-item">{tech}</span>
          ))}
        </div>
      </div>

      {/* ── SEO / GEO terminal split ── */}
      <motion.div
        className="code-services__seo"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="code-services__seo-bar">
          <Dots />
          <span className="code-services__card-filename">seo-analysis.sh</span>
        </div>
        <div className="code-services__seo-cols">
          <div className="code-services__seo-col">
            <p className="code-services__seo-label code-services__card-comment">{'# HUMAIN'}</p>
            <p className="code-services__seo-title code-services__card-keyword">
              {t('services.seo_human_title')}
            </p>
            <p className="code-services__seo-desc">{t('services.seo_human_desc')}</p>
          </div>
          <div className="code-services__seo-separator" aria-hidden="true" />
          <div className="code-services__seo-col">
            <p className="code-services__seo-label code-services__card-comment">{'# GEO'}</p>
            <p className="code-services__seo-title code-services__card-func">
              {t('services.seo_geo_title')}
            </p>
            <p className="code-services__seo-desc">{t('services.seo_geo_desc')}</p>
            <span className="code-services__seo-geo-badge">{t('services.seo_geo_label')}</span>
          </div>
        </div>
      </motion.div>

      {/* ── Bonus: creative + network ── */}
      <div className="code-services__bonus">
        <div className="code-services__bonus-card">
          <h3 className="code-services__bonus-title">{t('services.creative_title')}</h3>
          <p className="code-services__bonus-desc">{t('services.creative_desc')}</p>
        </div>
        <div className="code-services__bonus-card">
          <h3 className="code-services__bonus-title">{t('services.network_title')}</h3>
          <p className="code-services__bonus-desc">{t('services.network_desc')}</p>
        </div>
      </div>

    </section>
  );
}
