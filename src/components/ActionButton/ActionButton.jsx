// ActionButton - Bouton carré avec label et icône
import styles from './ActionButton.module.scss';

function ActionButton({ 
  icon,          
  onClick,      
  ariaLabel,
  label,
  isActive,      
  variant = 'default',
  delay = 0
}) {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''} ${styles[variant]}`}
      onClick={onClick}
      aria-label={ariaLabel || label}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
}

export default ActionButton;