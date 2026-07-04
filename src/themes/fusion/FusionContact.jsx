import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useContactForm } from '../../hooks/useContactForm';

export default function FusionContact() {
  const { t } = useTranslation();
  const { formData, status, handleChange, handleSubmit } = useContactForm();
  const [focused, setFocused] = useState(null);

  const fields = [
    { name: 'name', type: 'text', label: t('contact.name') },
    { name: 'email', type: 'email', label: t('contact.email') },
  ];

  return (
    <section className="fusion-contact section" id="contact">
      <h2 className="section__title">{t('contact.title')}</h2>
      <p className="section__subtitle">{t('contact.subtitle')}</p>
      <p className="fusion-contact__note">{t('contact.note')}</p>

      <motion.form
        className="fusion-contact__form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {fields.map(({ name, type, label }) => (
          <div key={name} className="fusion-contact__field">
            <input
              id={`fusion-${name}`}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              onFocus={() => setFocused(name)}
              onBlur={() => setFocused(null)}
              placeholder=" "
              required
              autoComplete={name}
            />
            <label
              htmlFor={`fusion-${name}`}
              className={focused === name || formData[name] ? 'floating' : ''}
            >
              {label}
            </label>
          </div>
        ))}

        <div className="fusion-contact__field">
          <textarea
            id="fusion-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            placeholder=" "
            required
            rows={5}
          />
          <label
            htmlFor="fusion-message"
            className={focused === 'message' || formData.message ? 'floating' : ''}
          >
            {t('contact.message')}
          </label>
        </div>

        <button
          type="submit"
          className="fusion-contact__submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? t('contact.sending') : t('contact.send')}
        </button>

        {status === 'success' && (
          <p className="fusion-contact__status fusion-contact__status--success">
            {t('contact.success')}
          </p>
        )}
        {status === 'error' && (
          <p className="fusion-contact__status fusion-contact__status--error">
            {t('contact.error')}
          </p>
        )}
      </motion.form>
    </section>
  );
}
