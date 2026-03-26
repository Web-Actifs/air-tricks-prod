import './Logo.css';

export default function Logo({ size = 'default' }) {
  return (
    <div className={`logo logo--${size}`}>
      <span className="logo__text">Air Tricks</span>
      <span className="logo__prod">Prod</span>
    </div>
  );
}
