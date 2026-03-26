import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function CodeContact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('contact.success'));
    setForm({ name: '', email: '', message: '' });
  };

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
          <label>
            <span className="code-contact__prompt">$</span> {t('contact.name')}
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="code-contact__field">
          <label>
            <span className="code-contact__prompt">$</span> {t('contact.email')}
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="code-contact__field">
          <label>
            <span className="code-contact__prompt">$</span> {t('contact.message')}
          </label>
          <textarea
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="code-contact__submit">
          <span className="code-contact__prompt">$</span> {t('contact.send')}
          <span className="code-hero__cursor">|</span>
        </button>
      </motion.form>
    </section>
  );
}
