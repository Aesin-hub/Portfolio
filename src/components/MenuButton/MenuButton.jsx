// MenuButton - Étiquette cliquable qui ouvre/ferme les boutons en cascade
import styles from './MenuButton.module.scss';

function MenuButton({ isOpen, onToggle }) {
  return (
    <button 
      className={`${styles.menuButton} ${isOpen ? styles.open : ''}`}
      onClick={onToggle}
      aria-label="Menu navigation"
      aria-expanded={isOpen}
    >
      <span className={styles.icon}>LB</span>
    </button>
  );
}

export default MenuButton;