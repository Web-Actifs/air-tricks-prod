import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function FusionContact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('contact.success'));
    setForm({ name: '', email: '', message: '' });
  };

  const fields = [
    { name: 'name', type: 'text', label: t('contact.name') },
    { name: 'email', type: 'email', label: t('contact.email') },
  ];

  return (
    <section className="fusion-contact section" id="contact">
      <h2 className="section__title">{t('contact.title')}</h2>
      <p className="section__subtitle">{t('contact.subtitle')}</p>

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
              type={type}
              value={form[name]}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              onFocus={() => setFocused(name)}
              onBlur={() => setFocused(null)}
              placeholder=" "
              required
              id={`fusion-${name}`}
            />
            <label
              htmlFor={`fusion-${name}`}
              className={focused === name || form[name] ? 'floating' : ''}
            >
              {label}
            </label>
          </div>
        ))}
        <div className="fusion-contact__field">
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            placeholder=" "
            required
            rows={5}
            id="fusion-message"
          />
          <label
            htmlFor="fusion-message"
            className={focused === 'message' || form.message ? 'floating' : ''}
          >
            {t('contact.message')}
          </label>
        </div>
        <button type="submit" className="fusion-contact__submit">
          {t('contact.send')}
        </button>
      </motion.form>
    </section>
  );
}
