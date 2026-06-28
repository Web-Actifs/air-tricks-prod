import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useContactForm } from '../../hooks/useContactForm';

export default function CodeContact() {
  const { t } = useTranslation();
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <section className="code-contact section" id="contact">
      <h2 className="section__title">
        <span className="code-services__comment">{'// '}</span>
        {t('contact.title')}
      </h2>
      <p className="section__subtitle">{t('contact.subtitle')}</p>

      <motion.form
        className="code-contact__form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="code-contact__field">
          <label htmlFor="code-name">
            <span className="code-contact__prompt">$</span> {t('contact.name')}
          </label>
          <input
            id="code-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>
        <div className="code-contact__field">
          <label htmlFor="code-email">
            <span className="code-contact__prompt">$</span> {t('contact.email')}
          </label>
          <input
            id="code-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="code-contact__field">
          <label htmlFor="code-message">
            <span className="code-contact__prompt">$</span> {t('contact.message')}
          </label>
          <textarea
            id="code-message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="code-contact__submit"
          disabled={status === 'sending'}
        >
          <span className="code-contact__prompt">$</span>{' '}
          {status === 'sending' ? t('contact.sending') : t('contact.send')}
          <span className="code-hero__cursor">|</span>
        </button>

        {status === 'success' && (
          <p className="code-contact__status code-contact__status--success">
            {t('contact.success')}
          </p>
        )}
        {status === 'error' && (
          <p className="code-contact__status code-contact__status--error">
            {t('contact.error')}
          </p>
        )}
      </motion.form>
    </section>
  );
}
