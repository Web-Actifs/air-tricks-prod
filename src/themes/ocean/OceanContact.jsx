import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function OceanContact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend / email service
    try {
      // Simulate success
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="ocean-contact">
      {/* Decorative wave top */}
      <div className="ocean-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M0,70 C240,20 480,90 720,50 C960,10 1200,80 1440,40 L1440,0 L0,0 Z"
            fill="var(--color-bg)"
          />
        </svg>
      </div>

      <div className="ocean-contact__inner">
        <motion.h2
          className="ocean-section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('contact.title')}
        </motion.h2>
        <motion.p
          className="ocean-section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t('contact.subtitle')}
        </motion.p>

        <motion.form
          className="ocean-contact__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="ocean-form-group">
            <label htmlFor="ocean-name" className="ocean-form-label">
              {t('contact.name')}
            </label>
            <input
              id="ocean-name"
              className="ocean-form-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div className="ocean-form-group">
            <label htmlFor="ocean-email" className="ocean-form-label">
              {t('contact.email')}
            </label>
            <input
              id="ocean-email"
              className="ocean-form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="ocean-form-group">
            <label htmlFor="ocean-message" className="ocean-form-label">
              {t('contact.message')}
            </label>
            <textarea
              id="ocean-message"
              className="ocean-form-input ocean-form-textarea"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="ocean-btn ocean-btn--primary ocean-btn--full">
            {t('contact.send')}
          </button>

          {status === 'success' && (
            <p className="ocean-contact__status ocean-contact__status--success">
              {t('contact.success')}
            </p>
          )}
          {status === 'error' && (
            <p className="ocean-contact__status ocean-contact__status--error">
              {t('contact.error')}
            </p>
          )}
        </motion.form>
      </div>

      {/* Decorative wave bottom */}
      <div className="ocean-wave-divider ocean-wave-divider--bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,30 C360,80 720,10 1080,50 C1260,70 1380,20 1440,40 L1440,80 L0,80 Z"
            fill="var(--color-primary)"
            fillOpacity="0.08"
          />
        </svg>
      </div>
    </section>
  );
}
